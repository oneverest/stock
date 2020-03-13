import { BaseController } from '../../../../core/infra/BaseController';
import { CreateUserUseCase } from './createUserUseCase';
import { CreateUserDTO } from './createUserDTO';
import * as CreateUserErrors from './createUserErrors';
import { Result } from 'core/logic/Result';

export class CreateUserController extends BaseController {
  private useCase: CreateUserUseCase;

  constructor(useCase: CreateUserUseCase) {
    super();
    this.useCase = useCase;
  }

  async executeImpl() {
    const request = this.req.body as CreateUserDTO;

    try {
      const result = await this.useCase.execute(request);

      if (result.isLeft()) {
        const error = result.value;
        switch (error.constructor) {
          case CreateUserErrors.EmailAlreadyExists:
            return this.conflict(error.errorValue().message);
          case Result:
            return this.fail(error.errorValue());
          default:
            return this.fail(error.errorValue().message);
        }
      }

      return this.created(this.res);
    } catch (error) {
      return this.fail(error);
    }
  }
}
