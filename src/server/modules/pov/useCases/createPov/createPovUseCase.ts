import { UseCase } from 'core/domain/UseCase';
import { CreatePovDTO } from './createPovDTO';
import * as GenericAppError from '../../../../core/logic/AppError';
import { Result, Either, right, left } from 'core/logic/Result';
import { RecordAlreadyExists } from './createPovErrors';
import { IPovRepo } from 'modules/pov/repo/IPovRepo';
import { PovDate } from 'modules/pov/domain/povDate';
import { Pov } from 'modules/pov/domain/pov';

type Response = Either<RecordAlreadyExists | GenericAppError.UnexpectedError | Result<any>, Result<void>>;

export class CreatePovUseCase implements UseCase<CreatePovDTO, Response> {
  private repo: IPovRepo;

  constructor(repo: IPovRepo) {
    this.repo = repo;
  }

  async execute(request: CreatePovDTO) {
    const { record_date } = request;

    const dateOrError = PovDate.create(record_date);

    if (dateOrError.isFailure) {
      return left(Result.fail(dateOrError)) as Response;
    }

    const recordOrError = Pov.create({ ...request, record_date: dateOrError.getValue() });

    if (recordOrError.isFailure) {
      return left(Result.fail(recordOrError)) as Response;
    }

    const record = recordOrError.getValue();

    // 对应日期的记录是否已经存在
    const resultOrError = await this.repo.getRecordByDate(record.record_date);
    if (resultOrError.isFailure) {
      return left(resultOrError) as Response;
    }
    if (!resultOrError.getValue()) {
      return left(new RecordAlreadyExists(record.record_date.value)) as Response;
    }

    try {
      await this.repo.save(record);
    } catch (error) {
      console.log(error);
      return left(new GenericAppError.UnexpectedError(error)) as Response;
    }

    return right(Result.ok<void>()) as Response;
  }
}
