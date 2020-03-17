import { GetAllPovsUseCase } from './GetAllPovsUseCase';
import { povRepo } from 'modules/pov/repo';
import { GetAllPovsController } from './GetAllPovsController';

const getAllPovsUseCase = new GetAllPovsUseCase(povRepo);
const getAllPovsController = new GetAllPovsController(getAllPovsUseCase);

export { getAllPovsUseCase, getAllPovsController };
