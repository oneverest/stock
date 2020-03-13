import { UserRepo } from './IUserRepo';
import { UserEmail } from '../domain/userEmail';
import { User } from '../domain/user';
import { Result } from 'server/core/logic/Result';
import { UserMap } from '../mappers/UserMap';

export class PostgresUserRepo implements UserRepo {
  private models: any;

  constructor(models: any) {
    this.models = models;
  }

  private createBaseQuery(): any {
    // const { models } = this;
    return {
      where: {},
      include: [],
    };
  }

  async exists(email: UserEmail): Promise<boolean> {
    const baseQuery = this.createBaseQuery();
    baseQuery.where['user_email'] = email.value.toString();
    const user = await this.models.BaseUser.findOne(baseQuery);
    return !!user === true;
  }

  async save(user: User): Promise<void> {
    const BaseUserModel = this.models.BaseUser;
    const exists = await this.exists(user.email);
    const rawUser = await UserMap.toPersistence(user);

    try {
      if (!exists) {
        await BaseUserModel.create(rawUser);
      } else {
        const userInstance = await BaseUserModel.findOne({
          where: {
            user_email: user.email.value,
          },
        });
        await userInstance.update(rawUser);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async getUserByEmail(email: UserEmail): Promise<Result<User>> {
    const baseQuery = this.createBaseQuery();
    baseQuery.where['user_email'] = email.value.toString();
    const data = await this.models.BaseUser.findOne(baseQuery);
    if (!!data) {
      const user = UserMap.toDomain(data);
      if (!user) {
        return Result.fail('内部错误');
      }
      return Result.ok(user);
    }

    return Result.fail(`${email.value} 对应的用户不存在`);
  }
}
