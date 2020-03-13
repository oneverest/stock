import { ValueObject } from '../../../core/domain/ValueObject';
import { Guard } from '../../../core/logic/Guard';
import { Result } from '../../../core/logic/Result';

interface UserEmailProps {
  value: string;
}

export class UserEmail extends ValueObject<UserEmailProps> {
  get value() {
    return this.props.value;
  }

  constructor(props: UserEmailProps) {
    super(props);
  }

  public static create(email: string) {
    const guardResult = Guard.againstNullOrUndefined(email, 'email');
    if (!guardResult.succeeded) {
      return Result.fail<UserEmail>(guardResult.message);
    }

    return Result.ok(new UserEmail({ value: email }));
  }
}
