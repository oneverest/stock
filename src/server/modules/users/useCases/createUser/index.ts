import { CreateUserController } from './createUserController';
import { CreateUserUseCase } from './createUserUseCase';
import { userRepo } from '../../repo';

const createUserUseCase = new CreateUserUseCase(userRepo);
const createUserController = new CreateUserController(createUserUseCase);

export { createUserUseCase, createUserController };
