import { UseCase } from 'core/domain/UseCase';
import { Either, Result, right, left } from 'core/logic/Result';
import { UnexpectedError, EntityNotFoundError } from 'core/logic/AppError';
import { DeletePovDTO } from './deletePovDTO';
import { IPovRepo } from 'modules/pov/repo/IPovRepo';
import { UniqueEntityID } from 'core/domain/UniqueEntityID';

type Response = Either<UnexpectedError | EntityNotFoundError | Result<any>, Result<void>>;
export class DeletePovUseCase implements UseCase<DeletePovDTO, Response> {
  private repo: IPovRepo;

  constructor(repo: IPovRepo) {
    this.repo = repo;
  }

  async execute(request: DeletePovDTO) {
    const id = new UniqueEntityID(request.id);

    if (!(await this.repo.exists(id))) {
      return left(new EntityNotFoundError(id)) as Response;
    }

    try {
      const resultOrError = await this.repo.remove(id);
      if (resultOrError.isFailure) {
        return left(resultOrError) as Response;
      }
      return right(Result.ok<void>()) as Response;
    } catch (error) {
      console.log(error);
      return left(new UnexpectedError(error)) as Response;
    }
  }
}
