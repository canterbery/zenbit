import { ApiPath } from '~/libs/enums/enums.js';
import {
  type ApiHandlerOptions,
  type ApiHandlerResponse,
  Controller,
} from '~/libs/packages/controller/controller.js';
import { HttpCode } from '~/libs/packages/http/http.js';
import { type ILogger } from '~/libs/packages/logger/logger.js';
import {
  type UserSignInRequestDto,
  userSignInValidationSchema,
  type UserSignUpRequestDto,
} from '~/packages/users/users.js';
import { userSignUpValidationSchema } from '~/packages/users/users.js';

import { type AuthService } from './auth.service.js';
import { AuthApiPath } from './libs/enums/enums.js';

class AuthController extends Controller {
  private authService: AuthService;

  public constructor(logger: ILogger, authService: AuthService) {
    super(logger, ApiPath.AUTH);

    this.authService = authService;

    this.addRoute({
      path: AuthApiPath.SIGN_UP,
      method: 'POST',
      validation: {
        body: userSignUpValidationSchema,
      },
      handler: (options) =>
        this.signUp(
          options as ApiHandlerOptions<{
            body: UserSignUpRequestDto;
          }>,
        ),
    });

    this.addRoute({
      path: AuthApiPath.SIGN_IN,
      method: 'POST',
      validation: {
        body: userSignInValidationSchema,
      },
      handler: (options) => {
        return this.signIn(
          options as ApiHandlerOptions<{
            body: UserSignInRequestDto;
          }>,
        );
      },
    });

    this.addRoute({
      path: AuthApiPath.CURRENT,
      method: 'GET',
      handler: (options) => this.getCurrentUser(options),
    });
  }

  private async signUp(
    options: ApiHandlerOptions<{
      body: UserSignUpRequestDto;
    }>,
  ): Promise<ApiHandlerResponse> {
    return {
      status: HttpCode.CREATED,
      payload: await this.authService.signUp(options.body),
    };
  }

  private async signIn(
    options: ApiHandlerOptions<{
      body: UserSignInRequestDto;
    }>,
  ): Promise<ApiHandlerResponse> {
    return {
      status: HttpCode.OK,
      payload: await this.authService.signIn(options.body),
    };
  }

  private getCurrentUser(options: ApiHandlerOptions): ApiHandlerResponse {
    return {
      status: HttpCode.OK,
      payload: options.user,
    };
  }
}

export { AuthController };
