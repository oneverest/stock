import { Mapper } from '../../../core/infra/Mapper';
import { User } from '../domain/user';
import { UserPassword } from '../domain/userPassword';
import { UserEmail } from '../domain/userEmail';
import { UniqueEntityID } from 'core/domain/UniqueEntityID';
import { UserEmailToken } from '../domain/userEmailToken';

export class UserMap extends Mapper {
  public static toDomain(raw: any) {
    const userEmailOrError = UserEmail.create(raw.user_email);
    const userPasswordOrError = UserPassword.create({
      value: raw.user_password,
      hashed: true,
    });

    const userOrError = User.create(
      {
        isEmailVerified: raw.is_email_verified,
        password: userPasswordOrError.getValue(),
        email: userEmailOrError.getValue(),
        emailToken: UserEmailToken.create(raw.email_token),
        username: raw.username,
      },
      new UniqueEntityID(raw.base_user_id),
    );

    userOrError.isFailure ? console.log(userEmailOrError.error) : '';
    return userOrError.isSuccess ? userOrError.getValue() : null;
  }

  public static async toPersistence(user: User) {
    return {
      base_user_id: user.id.toString(),
      user_email: user.email.value,
      user_password: await user.password.getHashedValue(),
      is_email_verified: user.isEmailVerified,
      email_token: user.emailToken.value,
    };
  }

  public static toDTO(user: User) {
    return {
      id: user.id.toString(),
      email: user.email.value,
      name: user.username,
    };
  }
}
