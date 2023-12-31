import { logger } from '~/libs/packages/logger/logger.js';

import { UserController } from './user.controller.js';
import { UserModel } from './user.model.js';
import { UserRepository } from './user.repository.js';
import { UserService } from './user.service.js';
import { encrypt } from '~/libs/packages/encrypt/encrypt.js';
import { config } from '~/libs/packages/config/config.js';

const userRepository = new UserRepository(UserModel);
const userService = new UserService(userRepository, encrypt, config);
const userController = new UserController(logger, userService);

export { userController, userService };
export {
  type UserSignUpRequestDto,
  type UserSignUpResponseDto,
  type UserSignInRequestDto,
  type UserSignInResponseDto,
  type UserPrivateData,
  type UserAuthResponseDto,
} from './libs/types/types.js';
export {
  userSignUpValidationSchema,
  userSignInValidationSchema,
} from './libs/validation-schemas/validation-schemas.js';
export { UserModel } from './user.model.js';
export { type UserService } from './user.service.js';
