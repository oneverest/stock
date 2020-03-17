/*
 * @Author: your name
 * @Date: 2020-03-17 11:30:15
 * @LastEditTime: 2020-03-17 11:58:28
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /stock/src/server/modules/pov/useCases/getAllPovs/GetAllPovsController.ts
 */

import { BaseController } from 'core/infra/BaseController';
import { GetAllPovsUseCase } from './GetAllPovsUseCase';
import { GetAllPovsDTO } from './GetAllPovsDTO';
import { Result } from 'core/logic/Result';

export class GetAllPovsController extends BaseController {
  private useCase: GetAllPovsUseCase;

  constructor(useCase: GetAllPovsUseCase) {
    super();
    this.useCase = useCase;
  }

  async executeImpl() {
    const dto: GetAllPovsDTO = this.req.query as any;

    try {
      const resultOrError = await this.useCase.execute(dto);
      if (resultOrError.isLeft()) {
        const error = resultOrError.value;

        switch (error.constructor) {
          case Result:
            return this.fail(error.errorValue());
          default:
            return this.fail(error.errorValue().message);
        }
      } else {
        return this.ok(this.res, (resultOrError as any).value.getValue());
      }
    } catch (err) {
      console.log(err);
      return this.fail(err);
    }
  }
}
