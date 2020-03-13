import { User } from '../domain/user';
import { UserEmail } from '../domain/userEmail';
import { Result } from '../../../core/logic/Result';

export interface UserRepo {
  exists(email: UserEmail): Promise<boolean>;
  save(user: User): Promise<void>;
  getUserByEmail(email: UserEmail): Promise<Result<User>>;
}
