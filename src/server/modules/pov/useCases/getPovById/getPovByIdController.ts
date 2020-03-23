import { BaseController } from 'core/infra/BaseController';
import { GetPovByIdUseCase } from './getPovByIdUseCase';
import { GetPovByIdDTO } from './getPovByIdDTO';
import { EntityNotFoundError } from 'core/logic/AppError';
import { Result } from 'core/logic/Result';

export class GetPovByIdController extends BaseController {
  private useCase: GetPovByIdUseCase;

  constructor(useCase: GetPovByIdUseCase) {
    super();
    this.useCase = useCase;
  }

  async executeImpl() {
    const dto = {} as GetPovByIdDTO;
    dto.id = this.req.params.id;

    try {
      const resultOrError = await this.useCase.execute(dto);

      if (resultOrError.isLeft()) {
        const error = resultOrError.value;

        switch (error.constructor) {
          case EntityNotFoundError:
            return this.fail(error.errorValue().message);
          case Result:
            return this.fail(error.errorValue());
          default:
            return this.fail(error.errorValue().message);
        }
      } else {
        return this.ok(this.res, (resultOrError as any).value.getValue());
      }
    } catch (err) {
      return this.fail(err);
    }
  }
}
