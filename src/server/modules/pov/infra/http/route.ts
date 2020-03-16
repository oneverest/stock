import { Router } from 'express';
import { createPovController } from 'modules/pov/useCases/createPov';
import { updatePovController } from 'modules/pov/useCases/updatePov';

const povRouter = Router();

povRouter.post('/', (req, res) => createPovController.execute(req, res));
povRouter.post('/:id', (req, res) => updatePovController.execute(req, res));

export { povRouter };
