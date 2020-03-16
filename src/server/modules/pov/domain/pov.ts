import { AggregateRoot } from 'core/domain/AggregateRoot';
import { UniqueEntityID } from 'core/domain/UniqueEntityID';
import { Guard } from 'core/logic/Guard';
import { Result } from 'core/logic/Result';
import { PovDate } from './povDate';

interface Props {
  net_worth: number;
  position_ratio: number;
  szzs: number;
  record_date: PovDate;
}

export class Pov extends AggregateRoot<Props> {
  get id() {
    return this._id;
  }

  get net_worth() {
    return this.props.net_worth;
  }

  get position_ratio() {
    return this.props.position_ratio;
  }

  get record_date() {
    return this.props.record_date;
  }

  get szzs() {
    return this.props.szzs;
  }

  constructor(props: Props, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create(props: Props, id?: UniqueEntityID) {
    const guardResult = Guard.againstNullOrUndefinedBulk([
      { argument: props.net_worth, argumentName: 'net_worth' },
      { argument: props.position_ratio, argumentName: 'position_ratio' },
      { argument: props.record_date, argumentName: 'record_date' },
      { argument: props.szzs, argumentName: 'szzs' },
    ]);

    if (!guardResult.succeeded) return Result.fail<Pov>(guardResult.message);

    const record = new Pov(props, id);

    return Result.ok(record);
  }
}
