import { Either, Result, left, right } from 'core/logic/Result';
import { UnexpectedError, EntityNotFoundError } from 'core/logic/AppError';
import { UseCase } from 'core/domain/UseCase';
import { GetPovByIdDTO } from './getPovByIdDTO';
import { IPovRepo } from 'modules/pov/repo/IPovRepo';
import { UniqueEntityID } from 'core/domain/UniqueEntityID';
import { PovMap } from 'modules/pov/mappers/PovMap';

type Response = Either<EntityNotFoundError | UnexpectedError | Result<any>, Result<any>>;

export class GetPovByIdUseCase implements UseCase<GetPovByIdDTO, Response> {
  private repo: IPovRepo;

  constructor(repo: IPovRepo) {
    this.repo = repo;
  }

  async execute(request: GetPovByIdDTO) {
    const id = new UniqueEntityID(request.id);

    try {
      const resultOrError = await this.repo.getRecordById(id);

      if (resultOrError.isFailure) {
        return left(resultOrError) as Response;
      }

      const record = resultOrError.getValue();

      if (!record) {
        return left(new EntityNotFoundError(id)) as Response;
      }

      return right(Result.ok(PovMap.toDTO(record))) as Response;
    } catch (error) {
      return left(new UnexpectedError(error)) as Response;
    }
  }
}
