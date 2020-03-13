import { UserEmail } from './userEmail';
import { UserPassword } from './userPassword';
import { AggregateRoot } from '../../../core/domain/AggregateRoot';
import { UniqueEntityID } from '../../../core/domain/UniqueEntityID';
import { Guard } from '../../../core/logic/Guard';
import { Result } from '../../../core/logic/Result';
import { UserCreatedEvent } from './events/userCreatedEvent';
import { UserEmailToken } from './userEmailToken';

// props: email, username, password

interface UserProps {
  username?: string;
  email: UserEmail;
  password: UserPassword;
  isEmailVerified: boolean;
  emailToken: UserEmailToken;
}

export class User extends AggregateRoot<UserProps> {
  get id() {
    return this._id;
  }

  get email() {
    return this.props.email;
  }

  get password() {
    return this.props.password;
  }

  get isEmailVerified() {
    return this.props.isEmailVerified;
  }

  get emailToken() {
    return this.props.emailToken;
  }

  get username() {
    return this.props.username;
  }

  private constructor(props: UserProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create(props: UserProps, id?: UniqueEntityID) {
    const guardResult = Guard.againstNullOrUndefinedBulk([
      { argument: props.email, argumentName: 'email' },
      { argument: props.password, argumentName: 'password' },
      { argument: props.isEmailVerified, argumentName: 'isEmailVerified' },
    ]);
    if (!guardResult.succeeded) {
      return Result.fail<User>(guardResult.message);
    }

    const user = new User(
      {
        ...props,
        username: props.username ? props.username : '',
      },
      id,
    );

    const idWasProvided = !!id;
    if (!idWasProvided) {
      user.addDomainEvent(new UserCreatedEvent(user));
    }

    return Result.ok(user);
  }
}
