import { IPovRepo } from './IPovRepo';
import { PovMap } from '../mappers/PovMap';
import { Pov } from '../domain/pov';
import { Result } from 'core/logic/Result';
import { PovDate } from '../domain/povDate';
import { Sequelize } from 'sequelize/types';
import { UniqueEntityID } from 'core/domain/UniqueEntityID';

export class PostgresPovRepo implements IPovRepo {
  private models: any;

  constructor(models: any) {
    this.models = models;
  }

  private createBaseQuery(): any {
    return {
      where: {},
      include: [],
    };
  }

  async exists(id: UniqueEntityID) {
    const baseQuery = this.createBaseQuery();
    baseQuery.where['base_id'] = id.toString();

    const record = await this.models.Pov.findOne(baseQuery);
    return !!record === true;
  }

  async save(record: Pov): Promise<void> {
    const model = this.models.Pov;
    const raw = PovMap.toPersistence(record);
    const exists = await this.exists(record.id);

    try {
      if (!exists) {
        await model.create(raw);
      } else {
        const aInstance = await model.findOne({
          where: {
            base_id: record.id.toString(),
          },
        });

        await aInstance.update(raw);
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async searchInRange(start: string, end: string): Promise<Result<any[]>> {
    const sequelize: Sequelize = this.models.sequelize;
    const [results, meta] = await sequelize.query('select * from pov where record_date >= $1 and record_date <= $2', {
      bind: [start, end],
    });

    console.log(meta);

    return Result.ok(results);
  }

  async findAll(options: any): Promise<Result<any>> {
    const sequelize: Sequelize = this.models.sequelize;

    // let condition = '';
    let limit = 20;
    let offset = 0;
    if (options.offset) offset = Number(options.offset);
    if (options.limit) limit = Number(options.limit);

    // if (options.start || options.end) {
    //   let condition = 'where';
    //   if (options.start) {
    //     condition += ` record_date >= '${String(options.start)}'`;
    //   }
    // }

    try {
      const [count] = await sequelize.query(`select count(*) from pov limit $1 offset $2`, {
        bind: [limit, offset],
        raw: true,
      });
      const [results] = await sequelize.query(`select * from pov order by record_date desc limit $1 offset $2`, {
        bind: [limit, offset],
      });

      return Result.ok({
        data: results,
        meta: {
          ...(count[0] as any),
          limit,
          offset,
        },
      });
    } catch (error) {
      return Result.fail(error);
    }
  }

  async getRecordByDate(date: PovDate): Promise<Result<Pov | null>> {
    const baseQuery = this.createBaseQuery();
    baseQuery.where['record_date'] = date.value;

    const record = await this.models.Pov.findOne(baseQuery);

    if (!!record) {
      const domainInstance = PovMap.toDomain(record);
      if (!domainInstance) return Result.fail('Mapper Error');
      return Result.ok(domainInstance);
    }

    return Result.ok(null);
  }

  async getRecordById(id: UniqueEntityID): Promise<Result<Pov | null>> {
    const baseQuery = this.createBaseQuery();
    baseQuery.where['base_id'] = id.toString();
    const model = this.models.Pov;

    const record = await model.findOne(baseQuery);

    if (!!record) {
      const domainInstance = PovMap.toDomain(record);
      if (!domainInstance) return Result.fail('Mapper Error');
      return Result.ok(domainInstance);
    }

    return Result.ok(null);
  }
}
