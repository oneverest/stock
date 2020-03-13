import { BaseController } from 'core/infra/BaseController';
import { LoginUseCase } from './loginUseCase';
import { LoginDTO } from './loginDTO';
import { Result } from 'core/logic/Result';
import { UserMap } from 'modules/users/mappers/UserMap';

export class LoginController extends BaseController {
  private useCase: LoginUseCase;

  constructor(useCase: LoginUseCase) {
    super();
    this.useCase = useCase;
  }

  async executeImpl() {
    const req = this.req;
    const request = req.body as LoginDTO;

    try {
      const result = await this.useCase.execute(request);
      if (result.isRight()) {
        const user = result.value.getValue();
        if (req.session) {
          const userInfo = UserMap.toDTO(user);
          req.session.user = userInfo;
          return this.ok(this.res, userInfo);
        }
        return this.fail('Session error occurs during login process');
      } else {
        const error = result.value;
        switch (error.constructor) {
          case Result:
            return this.clientError(error.errorValue());
          default:
            return this.fail(error.errorValue());
        }
      }
    } catch (err) {
      console.log(err);
      return this.fail(err);
    }
  }
}
