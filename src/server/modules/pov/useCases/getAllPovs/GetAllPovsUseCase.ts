import { Either, Result, left, right } from 'core/logic/Result';
import { UseCase } from 'core/domain/UseCase';
import { GetAllPovsDTO } from './GetAllPovsDTO';
import { IPovRepo } from 'modules/pov/repo/IPovRepo';

type Response = Either<Result<any>, Result<any[]>>;

export class GetAllPovsUseCase implements UseCase<GetAllPovsDTO, Response> {
  private repo: IPovRepo;

  constructor(repo: IPovRepo) {
    this.repo = repo;
  }

  async execute(request: GetAllPovsDTO) {
    const { pageSize, page } = request;
    const limit = pageSize ? Number(pageSize) : 20;
    const offset = (page - 1) * limit;

    const resultOrError = await this.repo.findAll({
      ...request,
      limit,
      offset,
    });

    if (resultOrError.isFailure) {
      return left(resultOrError) as Response;
    }

    return right(Result.ok(resultOrError.getValue())) as Response;
  }
}
