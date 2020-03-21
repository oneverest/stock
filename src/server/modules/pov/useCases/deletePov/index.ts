import { DeletePovUseCase } from './deletePovUseCase';
import { povRepo } from 'modules/pov/repo';
import { DeletePovController } from './deletePovController';

const deletePovUseCase = new DeletePovUseCase(povRepo);
const deletePovController = new DeletePovController(deletePovUseCase);

export { deletePovUseCase, deletePovController };
