import { BaseController } from 'core/infra/BaseController';
import { DeletePovUseCase } from './deletePovUseCase';
import { DeletePovDTO } from './deletePovDTO';
import { EntityNotFoundError } from 'core/logic/AppError';
import { Result } from 'core/logic/Result';

export class DeletePovController extends BaseController {
  private useCase: DeletePovUseCase;

  constructor(useCase: DeletePovUseCase) {
    super();
    this.useCase = useCase;
  }

  async executeImpl() {
    const dto = {} as DeletePovDTO;
    dto.id = this.req.params.id;

    try {
      const resultOrError = await this.useCase.execute(dto);

      if (resultOrError.isLeft()) {
        const error = resultOrError.value;
        switch (error.constructor) {
          case EntityNotFoundError:
            return this.notFound(error.errorValue().message);
          case Result:
            return this.fail(error.errorValue());
          default:
            return this.fail(error.errorValue().message);
        }
      }

      return this.ok(this.res);
    } catch (err) {
      console.log(err);
      return this.fail(err);
    }
  }
}
