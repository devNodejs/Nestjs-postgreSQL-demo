import { Sequelize } from 'sequelize-typescript';
import { User } from './../app/users/model/user.model';
import { Save } from '../app/users/model/save.model';
import { ConfigService } from './../shared/config/config.service';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async (configService: ConfigService) => {
      const sequelize = new Sequelize(configService.sequelizeOrmConfig);
      sequelize.addModels([User]);
      sequelize.addModels([Save]);
      await sequelize.sync();
      return sequelize;
    },
    inject: [ConfigService],
  },
];
