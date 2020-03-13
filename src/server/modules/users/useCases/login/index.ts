import { SignIn } from '../../services/authProviders/signIn';
import { LoginUseCase } from './loginUseCase';
import { LoginController } from './loginController';
import { userRepo } from 'modules/users/repo';

const signInService = new SignIn(userRepo);
const loginUseCase = new LoginUseCase(signInService);
const loginController = new LoginController(loginUseCase);

export { loginUseCase, loginController };
