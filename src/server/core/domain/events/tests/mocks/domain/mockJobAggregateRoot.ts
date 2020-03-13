/*eslint @typescript-eslint/no-explicit-any: off */
import { MockJobCreatedEvent } from '../events/mockJobCreatedEvent';
import { UniqueEntityID } from '../../../../UniqueEntityID';
import { MockJobDeletedEvent } from '../events/mockJobDeletedEvent';
import { AggregateRoot } from '../../../../AggregateRoot';

export interface IMockJobProps {
  [key: string]: any;
}

export class MockJobAggregateRoot extends AggregateRoot<IMockJobProps> {
  private constructor(props: IMockJobProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static createJob(props: IMockJobProps, id?: UniqueEntityID): MockJobAggregateRoot {
    const job = new this(props, id);
    job.addDomainEvent(new MockJobCreatedEvent(job.id));
    return job;
  }

  public deleteJob(): void {
    this.addDomainEvent(new MockJobDeletedEvent(this.id));
  }
}
