import { Mapper } from 'core/infra/Mapper';
import { Pov } from '../domain/pov';
import { UniqueEntityID } from 'core/domain/UniqueEntityID';
import { PovDate } from '../domain/povDate';

export class PovMap extends Mapper {
  public static toDomain(raw: any) {
    const dateOrError = PovDate.create(raw.record_date);
    const recordOrError = Pov.create(
      {
        net_worth: raw.net_worth,
        position_ratio: raw.position_ratio,
        record_date: dateOrError.getValue(),
        szzs: raw.szzs,
      },
      new UniqueEntityID(raw.base_id),
    );

    recordOrError.isFailure ? console.log(recordOrError.error) : '';

    return recordOrError.isSuccess ? recordOrError.getValue() : null;
  }

  public static toPersistence(record: Pov) {
    return {
      net_worth: record.net_worth,
      position_ratio: record.position_ratio,
      record_date: new Date(record.record_date.value),
      szzs: record.szzs,
    };
  }

  public static toDTO(record: Pov) {
    return {
      net_worth: record.net_worth,
      position_ratio: record.position_ratio,
      record_date: record.record_date.value,
      szzs: record.szzs,
    };
  }

  public static mapPersistenceToDTO(raw: any) {
    return {
      net_worth: raw.net_worth,
      position_ratio: raw.position_ratio,
      record_date: raw.record_date,
      szzs: raw.szzs,
    };
  }
}
