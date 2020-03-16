import { UseCase } from '../../../../core/domain/UseCase';
import { CreateUserDTO } from './createUserDTO';
import { UserRepo } from '../../repo/IUserRepo';
import { UserEmail } from '../../domain/userEmail';
import { UserPassword } from '../../domain/userPassword';
import { Result, left, Either, right } from '../../../../core/logic/Result';
import * as CreateUserErrors from './createUserErrors';
import * as GenericAppError from '../../../../core/logic/AppError';
import { User } from '../../domain/user';
import { UserEmailToken } from 'modules/users/domain/userEmailToken';

type Response = Either<
  CreateUserErrors.EmailAlreadyExists | GenericAppError.UnexpectedError | Result<any>,
  Result<void>
>;

export class CreateUserUseCase implements UseCase<CreateUserDTO, Response> {
  constructor(private repo: UserRepo) {}

  async execute(request: CreateUserDTO) {
    const { password, email } = request;
    const emailOrError = UserEmail.create(email);
    const passwordOrError = UserPassword.create({ value: password });
    // const emailTokenOrError = UserEmailToken.create();

    const combineResult = Result.combine([emailOrError, passwordOrError]);
    if (combineResult.isFailure) {
      return left(Result.fail(combineResult.error)) as Response;
    }

    const userOrError = User.create({
      isEmailVerified: false,
      email: emailOrError.getValue(),
      password: passwordOrError.getValue(),
      emailToken: UserEmailToken.create(),
    });
    if (userOrError.isFailure) {
      return left(userOrError) as Response;
    }

    const user = userOrError.getValue();
    const emailWasTaken = await this.repo.exists(user.email);
    if (emailWasTaken) {
      return left(new CreateUserErrors.EmailAlreadyExists(email)) as Response;
    }

    try {
      await this.repo.save(user);
    } catch (error) {
      return left(GenericAppError.UnexpectedError.create(error)) as Response;
    }

    return right(Result.ok<void>()) as Response;
  }
}
