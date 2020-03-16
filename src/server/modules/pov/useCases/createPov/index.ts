import { CreatePovUseCase } from './createPovUseCase';
import { povRepo } from 'modules/pov/repo';
import { CreatePovController } from './createPovController';

const createPovUseCase = new CreatePovUseCase(povRepo);
const createPovController = new CreatePovController(createPovUseCase);

export { createPovUseCase, createPovController };
