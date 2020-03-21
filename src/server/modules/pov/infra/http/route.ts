import { Router } from 'express';
import { createPovController } from 'modules/pov/useCases/createPov';
import { updatePovController } from 'modules/pov/useCases/updatePov';
import { getAllPovsController } from 'modules/pov/useCases/getAllPovs';
import { deletePovController } from 'modules/pov/useCases/deletePov';

const povRouter = Router();

povRouter.post('/', (req, res) => createPovController.execute(req, res));
povRouter.post('/:id', (req, res) => updatePovController.execute(req, res));
povRouter.get('/', (req, res) => getAllPovsController.execute(req, res));
povRouter.delete('/:id', (req, res) => deletePovController.execute(req, res));

export { povRouter };
