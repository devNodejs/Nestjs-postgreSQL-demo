import { Injectable } from '@nestjs/common';
import { configrationDatabase } from '../../config/configration.database';

@Injectable()
export class ConfigService {
  get sequelizeOrmConfig() {
    return configrationDatabase.database;
  }
  get jwtConfig() {
    return { privateKey: configrationDatabase.jwtPrivateKey };
  }
}
