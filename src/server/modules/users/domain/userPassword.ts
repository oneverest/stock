import { ValueObject } from '../../../core/domain/ValueObject';
import { Guard } from '../../../core/logic/Guard';
import { Result } from '../../../core/logic/Result';
import * as bcrypt from 'bcryptjs';

interface UserPasswordProps {
  value: string;
  hashed?: boolean;
}

export class UserPassword extends ValueObject<UserPasswordProps> {
  get value() {
    return this.props.value;
  }

  get salt() {
    // todo: read from env
    return '$2a$10$vXJf2EyHDobs/7JPuP5WKe';
  }

  private constructor(props: UserPasswordProps) {
    super(props);
  }

  private isAlreadyHashed() {
    return !!this.props.hashed;
  }

  private async hashPassword(plainText: string) {
    const firstHash = await bcrypt.hash(plainText, this.salt);
    return bcrypt.hash(firstHash, this.salt);
  }

  private async becryptCompare(hash: string, plainText: string) {
    const firstHash = await bcrypt.hash(plainText, this.salt);
    return bcrypt.compare(firstHash, hash);
  }

  public async getHashedValue() {
    if (this.isAlreadyHashed()) {
      return this.props.value;
    }

    return this.hashPassword(this.props.value);
  }

  public async comparePassword(plainText: string) {
    if (this.isAlreadyHashed()) {
      return this.becryptCompare(this.props.value, plainText);
    }
    return plainText === this.props.value;
  }

  public static isAppropriateLength(password: string) {
    return password.length >= 8;
  }

  public static create(props: UserPasswordProps) {
    const { value: password, hashed } = props;

    const guardResult = Guard.againstNullOrUndefined(password, 'password');
    if (!guardResult.succeeded) {
      return Result.fail<UserPassword>(guardResult.message);
    }

    if (!hashed) {
      if (!this.isAppropriateLength(password)) {
        return Result.fail<UserPassword>('The password length must be greater than 8');
      }
    }

    return Result.ok(
      new UserPassword({
        ...props,
        hashed: !!props.hashed === true,
      }),
    );
  }
}
