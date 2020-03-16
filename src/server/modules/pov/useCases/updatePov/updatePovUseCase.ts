import { UseCase } from 'core/domain/UseCase';
import { Either, Result, right, left } from 'core/logic/Result';
import { UnexpectedError, EntityNotFoundError } from 'core/logic/AppError';
import { UpdatePovDTO } from './updatePovDTO';
import { IPovRepo } from 'modules/pov/repo/IPovRepo';
import { UniqueEntityID } from 'core/domain/UniqueEntityID';
import { PovDate } from 'modules/pov/domain/povDate';
import { Pov } from 'modules/pov/domain/pov';

type Response = Either<EntityNotFoundError | UnexpectedError | Result<any>, Result<void>>;

export class UpdatePovUseCase implements UseCase<UpdatePovDTO, Response> {
  private repo: IPovRepo;

  constructor(repo: IPovRepo) {
    this.repo = repo;
  }

  async execute(request: UpdatePovDTO) {
    const entityId = new UniqueEntityID(request.id);

    const recordOrError = await this.repo.getRecordById(entityId);
    if (recordOrError.isFailure) {
      return left(recordOrError) as Response;
    }

    const record = recordOrError.getValue();
    if (!record) {
      return left(new EntityNotFoundError(entityId)) as Response;
    }

    let recordDate = record.record_date;
    if (request.record_date) {
      const dateOrError = PovDate.create(request.record_date);
      if (dateOrError.isFailure) {
        // console.log(dateOrError.errorValue());
        return left(dateOrError) as Response;
      }
      recordDate = dateOrError.getValue();
    }

    const newRecordOrError = Pov.create(
      {
        ...record.props,
        ...request,
        record_date: recordDate,
      },
      entityId,
    );

    if (newRecordOrError.isFailure) {
      return left(newRecordOrError) as Response;
    }

    try {
      await this.repo.save(newRecordOrError.getValue());
    } catch (error) {
      return left(new UnexpectedError(error)) as Response;
    }

    return right(Result.ok<void>()) as Response;
  }
}
