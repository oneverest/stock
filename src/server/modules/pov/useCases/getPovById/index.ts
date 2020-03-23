import { povRepo } from 'modules/pov/repo';
import { GetPovByIdController } from './getPovByIdController';
import { GetPovByIdUseCase } from './getPovByIdUseCase';

const getPovByIdUseCase = new GetPovByIdUseCase(povRepo);
const getPovByIdController = new GetPovByIdController(getPovByIdUseCase);

export { getPovByIdUseCase, getPovByIdController };
