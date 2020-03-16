import { UpdatePovUseCase } from './updatePovUseCase';
import { povRepo } from 'modules/pov/repo';
import { UpdatePovController } from './updatePovController';

const updatePovUseCase = new UpdatePovUseCase(povRepo);
const updatePovController = new UpdatePovController(updatePovUseCase);

export { updatePovUseCase, updatePovController };
