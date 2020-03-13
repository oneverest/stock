import { UserRepo } from './IUserRepo';
import { User } from '../domain/user';
import { BaseFakeRepo } from '../../../core/tests/BaseFakeRepo';
import { UserEmail } from '../domain/userEmail';
import { Result } from '../../../core/logic/Result';

export class InMemoryUserRepo extends BaseFakeRepo<User> implements UserRepo {
  async exists(email: UserEmail) {
    for (const user of this._items) {
      if (user.email.equals(email)) {
        return true;
      }
    }

    return false;
  }

  async save(user: User) {
    this.addFakeItem(user);
  }

  compareFakeItems(a: User, b: User) {
    return a.equals(b);
  }

  async getUserByEmail(email: UserEmail) {
    for (const user of this._items) {
      if (user.email.equals(email)) {
        return Result.ok<User>(user);
      }
    }

    return Result.fail<User>(`Email ${email.value} not found`);
  }
}
