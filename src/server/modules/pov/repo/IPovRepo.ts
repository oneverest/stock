import { Pov } from '../domain/pov';
import { Result } from 'core/logic/Result';
import { PovDate } from '../domain/povDate';
import { UniqueEntityID } from 'core/domain/UniqueEntityID';

export interface IPovRepo {
  save(record: Pov): Promise<void>;
  exists(id: UniqueEntityID): Promise<boolean>;
  searchInRange(from: string, to: string): Promise<Result<any[]>>;
  getRecordByDate(date: PovDate): Promise<Result<Pov | null>>;
  getRecordById(id: UniqueEntityID): Promise<Result<Pov | null>>;
}
