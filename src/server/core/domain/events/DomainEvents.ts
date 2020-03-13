/*eslint @typescript-eslint/no-explicit-any: off */
import { IDomainEvent } from './IDomainEvent';
import { AggregateRoot } from '../AggregateRoot';
import { UniqueEntityID } from '../UniqueEntityID';
import { getNamespace } from 'cls-hooked';
import { clsName } from '../../../config';

export class DomainEvents {
  private static handlersMap: { [key: string]: any } = {};
  private markedAggregates: AggregateRoot<any>[] = [];

  /**
   * @method markAggregateForDispatch
   * @static
   * @desc Called by aggregate root objects that have created domain
   * events to eventually be dispatched when the infrastructure commits
   * the unit of work.
   */

  public markAggregateForDispatch(aggregate: AggregateRoot<any>): void {
    const aggregateFound = !!this.findMarkedAggregateByID(aggregate.id);

    if (!aggregateFound) {
      this.markedAggregates.push(aggregate);
    }
  }

  private dispatchAggregateEvents(aggregate: AggregateRoot<any>): void {
    aggregate.domainEvents.forEach((event: IDomainEvent) => this.dispatch(event));
  }

  private removeAggregateFromMarkedDispatchList(aggregate: AggregateRoot<any>): void {
    const index = this.markedAggregates.findIndex(a => a.equals(aggregate));
    this.markedAggregates.splice(index, 1);
  }

  private findMarkedAggregateByID(id: UniqueEntityID): AggregateRoot<any> | null {
    let found = null;
    for (const aggregate of this.markedAggregates) {
      if (aggregate.id.equals(id)) {
        found = aggregate;
      }
    }

    return found;
  }

  public dispatchEventsForAggregate(id: UniqueEntityID): void {
    const aggregate = this.findMarkedAggregateByID(id);

    if (aggregate) {
      this.dispatchAggregateEvents(aggregate);
      aggregate.clearEvents();
      this.removeAggregateFromMarkedDispatchList(aggregate);
    }
  }

  public static register(callback: (event: IDomainEvent) => void, eventClassName: string): void {
    if (!DomainEvents.handlersMap.hasOwnProperty(eventClassName)) {
      DomainEvents.handlersMap[eventClassName] = [];
    }
    DomainEvents.handlersMap[eventClassName].push(callback);
  }

  public static clearHandlers(): void {
    DomainEvents.handlersMap = {};
  }

  public clearMarkedAggregates(): void {
    this.markedAggregates = [];
  }

  private dispatch(event: IDomainEvent): void {
    const eventClassName: string = event.constructor.name;

    if (DomainEvents.handlersMap.hasOwnProperty(eventClassName)) {
      const handlers: any[] = DomainEvents.handlersMap[eventClassName];
      for (const handler of handlers) {
        handler(event);
      }
    }
  }

  public static create(): DomainEvents {
    const ns = getNamespace(clsName);
    const key = 'DomainEvents';

    let model = ns.get(key);
    if (model === undefined) {
      model = new DomainEvents();
      ns.set(key, model);
    }

    return model;
  }
}
