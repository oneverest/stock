import { BaseController } from 'core/infra/BaseController';
import { UpdatePovUseCase } from './updatePovUseCase';
import { UpdatePovDTO } from './updatePovDTO';
import { Result } from 'core/logic/Result';
import { EntityNotFoundError } from 'core/logic/AppError';

export class UpdatePovController extends BaseController {
  private useCase: UpdatePovUseCase;

  constructor(useCase: UpdatePovUseCase) {
    super();
    this.useCase = useCase;
  }

  async executeImpl() {
    const dto = this.req.body as UpdatePovDTO;
    dto.id = this.req.params.id;

    try {
      const result = await this.useCase.execute(dto);

      if (result.isLeft()) {
        const error = result.value;
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
      return this.fail(err);
    }
  }
}
