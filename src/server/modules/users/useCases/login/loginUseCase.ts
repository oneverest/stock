import { UseCase } from '../../../../core/domain/UseCase';
import { LoginDTO } from './loginDTO';
import { SignIn } from '../../services/authProviders/signIn';
import { left, right, Result, Either } from '../../../../core/logic/Result';
import { UserEmail } from '../../domain/userEmail';
import { User } from '../../domain/user';

type Response = Either<Result<any>, Result<User>>;

export class LoginUseCase implements UseCase<LoginDTO, Response> {
  constructor(private signInService: SignIn) {}

  async execute(request: LoginDTO): Promise<Response> {
    const emailOrError = UserEmail.create(request.email);
    if (emailOrError.isFailure) {
      return left(emailOrError);
    }

    const loginUserOrError = await this.signInService.check({
      ...request,
      email: emailOrError.getValue(),
    });
    if (loginUserOrError.isFailure) {
      return left(loginUserOrError);
    }

    return right(Result.ok(loginUserOrError.getValue()));
  }
}
