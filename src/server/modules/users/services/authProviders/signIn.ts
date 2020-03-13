import { UserRepo } from '../../repo/IUserRepo';
import { UserEmail } from '../../domain/userEmail';
import { Result } from '../../../../core/logic/Result';
import { User } from '../../domain/user';

interface SignInRequest {
  email: UserEmail;
  password: string;
}

export class SignIn {
  constructor(private repo: UserRepo) {}

  async check(request: SignInRequest) {
    const userOrError = await this.repo.getUserByEmail(request.email);
    if (userOrError.isFailure) {
      return userOrError;
    }

    const user = userOrError.getValue();
    const compareResult = await user.password.comparePassword(request.password);
    if (!compareResult) {
      return Result.fail<User>('Invalid password');
    }

    return Result.ok(user);
  }
}
