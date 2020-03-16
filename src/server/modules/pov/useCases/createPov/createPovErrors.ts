import { Result } from 'core/logic/Result';
import { UseCaseError } from 'core/logic/UseCaseError';

export class RecordAlreadyExists extends Result<UseCaseError> {
  constructor(date: string) {
    super(false, `${date} 对应的数据已经存在`);
  }
}
