import { ValueObject } from 'core/domain/ValueObject';
import md5 from 'md5';

interface UserEmailTokenProps {
  value: string;
}

export class UserEmailToken extends ValueObject<UserEmailTokenProps> {
  get value() {
    return this.props.value;
  }

  constructor(props: UserEmailTokenProps) {
    super(props);
  }

  public static generateToken() {
    return Buffer.from(md5('--Z' + Number(new Date()) + 'z--')).toString('base64');
  }

  public static create(token?: string) {
    return new UserEmailToken({
      value: token ? token : UserEmailToken.generateToken(),
    });
  }
}
