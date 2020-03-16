import { BaseController } from 'core/infra/BaseController';
import { CreatePovDTO } from './createPovDTO';
import { CreatePovUseCase } from './createPovUseCase';
import { RecordAlreadyExists } from './createPovErrors';
import { Result } from 'core/logic/Result';

export class CreatePovController extends BaseController {
  private useCase: CreatePovUseCase;

  constructor(useCase: CreatePovUseCase) {
    super();
    this.useCase = useCase;
  }

  async executeImpl() {
    const request = this.req.body as CreatePovDTO;

    try {
      const resultOrError = await this.useCase.execute(request);
      if (resultOrError.isLeft()) {
        const error = resultOrError.value;

        switch (error.constructor) {
          case RecordAlreadyExists:
            return this.conflict(error.errorValue().message);
          case Result:
            return this.fail(error.errorValue());
          default:
            return this.fail(error.errorValue().message);
        }
      }

      return this.created(this.res);
    } catch (err) {
      return this.fail(err);
    }
  }
}
