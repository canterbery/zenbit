import convict, { type Config as TConfig } from 'convict';
import { config } from 'dotenv';

import { AppEnvironment, TokenExpirationTime } from '~/libs/enums/enums.js';
import { type ILogger } from '~/libs/packages/logger/logger.js';

import {
  type IAuthConfig,
  type IConfig,
} from './libs/interfaces/interfaces.js';
import {
  type EncryptConfig,
  type EnvironmentSchema,
} from './libs/types/types.js';

class Config implements IConfig {
  private logger: ILogger;

  public ENV: EnvironmentSchema;
  public AUTH: IAuthConfig;
  public ENCRYPTION: EncryptConfig;

  public constructor(logger: ILogger) {
    this.logger = logger;

    config();

    this.envSchema.load({});
    this.envSchema.validate({
      allowed: 'strict',
      output: (message) => this.logger.info(message),
    });
    this.AUTH = this.authConfig;
    this.ENV = this.envSchema.getProperties();
    this.ENCRYPTION = this.encryptionConfig;
    this.logger.info('.env file found and successfully parsed!');
  }

  private get envSchema(): TConfig<EnvironmentSchema> {
    return convict<EnvironmentSchema>({
      APP: {
        ENVIRONMENT: {
          doc: 'Application environment',
          format: Object.values(AppEnvironment),
          env: 'NODE_ENV',
          default: null,
        },
        HOST: {
          doc: 'Host for server app',
          format: String,
          env: 'HOST',
          default: null,
        },
        PORT: {
          doc: 'Port for incoming connections',
          format: Number,
          env: 'PORT',
          default: null,
        },
      },
      JWT: {
        SECRET_KEY: {
          doc: 'Secret key for token generation',
          format: String,
          env: 'JWT_SECRET_KEY',
          default: null,
        },
      },
      DB: {
        CONNECTION_STRING: {
          doc: 'Database connection string',
          format: String,
          env: 'DATABASE_URL',
          default: null,
        },
        DIALECT: {
          doc: 'Database dialect',
          format: String,
          env: 'DB_DIALECT',
          default: null,
        },
        POOL_MIN: {
          doc: 'Database pool min count',
          format: Number,
          env: 'DB_POOL_MIN',
          default: null,
        },
        POOL_MAX: {
          doc: 'Database pool max count',
          format: Number,
          env: 'DB_POOL_MAX',
          default: null,
        },
      },
    });
  }

  private get authConfig(): IAuthConfig {
    return {
      ALGORITHM: 'HS256',
      EXPIRES_IN: TokenExpirationTime.ONE_DAY,
    };
  }
  private get encryptionConfig(): EncryptConfig {
    return {
      USER_PASSWORD_SALT_ROUNDS: 10,
    };
  }
}

export { Config };
