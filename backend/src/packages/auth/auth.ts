import { logger } from '~/libs/packages/logger/logger.js';
import { userService } from '~/packages/users/users.js';

import { AuthController } from './auth.controller.js';
import { AuthService } from './auth.service.js';
import { encrypt } from '~/libs/packages/encrypt/encrypt.js';

const authService = new AuthService(userService, encrypt);
const authController = new AuthController(logger, authService);

export { authController, authService };
