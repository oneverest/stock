import { ValueObject } from 'core/domain/ValueObject';
import { Result } from 'core/logic/Result';
import * as _ from 'lodash';
import { Guard } from 'core/logic/Guard';

interface Props {
  value: string;
}

export class PovDate extends ValueObject<Props> {
  get value() {
    return this.props.value;
  }

  constructor(props: Props) {
    super(props);
  }

  public static normalize(date: string) {
    const datetime = new Date(date);
    if (String(datetime) === 'Invalid Date') {
      throw Error('Invalid Date');
    }
    const year = datetime.getFullYear();
    const month = datetime.getMonth() + 1;
    const day = datetime.getDate();

    return String(year) + '-' + _.padStart(String(month), 2, '0') + '-' + _.padStart(String(day), 2, '0');
  }

  public static create(date: string) {
    try {
      const guardResult = Guard.againstNullOrUndefined(date, 'record_date');
      if (!guardResult.succeeded) return Result.fail<PovDate>(guardResult.message);

      date = this.normalize(date);
      return Result.ok(new PovDate({ value: date }));
    } catch (error) {
      console.log(error);
      return Result.fail<PovDate>(error);
    }
  }
}
