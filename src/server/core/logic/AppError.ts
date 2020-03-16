/*eslint @typescript-eslint/no-explicit-any: off */
import { Result } from './Result';
import { UseCaseError } from './UseCaseError';
import { UniqueEntityID } from 'core/domain/UniqueEntityID';

export class UnexpectedError extends Result<UseCaseError> {
  public constructor(err: any) {
    super(false, {
      message: `An unexpected error occurred.`,
      error: err,
    } as UseCaseError);
    console.log(`[AppError]: An unexpected error occurred`);
    console.error(err);
  }

  public static create(err: any): UnexpectedError {
    return new UnexpectedError(err);
  }
}

export class EntityNotFoundError extends Result<UseCaseError> {
  public constructor(id: UniqueEntityID) {
    super(false, {
      message: `Entity ${id} not found`,
    });
  }
}
