import { DomainEvents } from '../DomainEvents';
import { MockJobCreatedEvent } from './mocks/events/mockJobCreatedEvent';
import { MockJobDeletedEvent } from './mocks/events/mockJobDeletedEvent';
import { MockJobAggregateRoot } from './mocks/domain/mockJobAggregateRoot';
import { MockPostToSocial } from './mocks/services/mockPostToSocial';
import { UniqueEntityID } from '../../UniqueEntityID';
import { createNamespace } from 'cls-hooked';
import { clsName } from '../../../../config';

const ns = createNamespace(clsName);
let social: MockPostToSocial | null;
let job: MockJobAggregateRoot | null;

describe('Domain Events', () => {
  beforeEach(() => {
    social = null;
    job = null;
  });

  describe('Calling create method', () => {
    it('will throw an error without cls context', () => {
      expect(() => DomainEvents.create()).toThrowError(/No context available/);
    });

    it('will always return the same DomainEvents instance within the same cls context', () => {
      ns.run(() => {
        const domainEventsPublisher = DomainEvents.create();
        expect(domainEventsPublisher).toBeDefined();
        expect(DomainEvents.create()).toBe(domainEventsPublisher);
      });
    });

    it('will return different DomainEvents instances within the different contexts', () => {
      ns.run(() => {
        const domainEventsPublisher = DomainEvents.create();
        expect(domainEventsPublisher['markedAggregates'].length).toBe(0);
        MockJobAggregateRoot.createJob({});
        expect(domainEventsPublisher['markedAggregates'].length).toBe(1);
      });

      ns.run(() => {
        const domainEventsPublisher = DomainEvents.create();
        expect(domainEventsPublisher['markedAggregates'].length).toBe(0);
      });
    });
  });

  describe('Given a JobCreatedEvent, JobDeletedEvent and a PostToSocial handler class', () => {
    it('Should be able to setup event subscriptions', () => {
      ns.run(() => {
        DomainEvents.clearHandlers();
        social = new MockPostToSocial();
        social.setupSubscriptions();

        expect(Object.keys(DomainEvents['handlersMap']).length).toBe(2);

        expect(DomainEvents['handlersMap'][MockJobCreatedEvent.name].length).toBe(1);
        expect(DomainEvents['handlersMap'][MockJobDeletedEvent.name].length).toBe(1);
      });
    });

    it('There should be exactly one handler subscribed to the JobCreatedEvent', () => {
      ns.run(() => {
        DomainEvents.clearHandlers();
        social = new MockPostToSocial();
        social.setupSubscriptions();

        expect(DomainEvents['handlersMap'][MockJobCreatedEvent.name].length).toBe(1);
      });
    });

    it('There should be exactly one handler subscribed to the JobDeletedEvent', () => {
      ns.run(() => {
        DomainEvents.clearHandlers();
        social = new MockPostToSocial();
        social.setupSubscriptions();

        expect(DomainEvents['handlersMap'][MockJobCreatedEvent.name].length).toBe(1);
      });
    });

    it('Should only add the domain event to the ', () => {
      ns.run(() => {
        const domainEventsPublisher = DomainEvents.create();
        social = new MockPostToSocial();
        social.setupSubscriptions();

        // Create the event, mark the aggregate
        MockJobAggregateRoot.createJob({}, new UniqueEntityID('99'));
        expect(domainEventsPublisher['markedAggregates']['length']).toBe(1);

        // Create a new job, it should also get marked
        job = MockJobAggregateRoot.createJob({}, new UniqueEntityID('12'));
        expect(domainEventsPublisher['markedAggregates']['length']).toBe(2);

        // Dispatch another action from the second job created
        job.deleteJob();

        // The number of aggregates should be the same
        expect(domainEventsPublisher['markedAggregates']['length']).toBe(2);

        // However, the second aggregate should have two events now
        expect(domainEventsPublisher['markedAggregates'][1].domainEvents.length).toBe(2);

        // And the first aggregate should have one event
        expect(domainEventsPublisher['markedAggregates'][0].domainEvents.length).toBe(1);

        // Dispatch the event for the first job
        domainEventsPublisher.dispatchEventsForAggregate(new UniqueEntityID('99'));
        expect(domainEventsPublisher['markedAggregates']['length']).toBe(1);

        // The job with two events should still be there
        expect(domainEventsPublisher['markedAggregates'][0].domainEvents.length).toBe(2);

        // Dispatch the event for the second job
        domainEventsPublisher.dispatchEventsForAggregate(new UniqueEntityID('12'));

        // There should be no more domain events in the list
        expect(domainEventsPublisher['markedAggregates']['length']).toBe(0);
      });
    });
  });
});
