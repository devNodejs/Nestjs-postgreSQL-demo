import { Dialect } from 'sequelize/types';

export const configrationDatabase = {
  database: {
    dialect: 'postgres' as Dialect,
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'postgres',
    database: 'databaseName',
    logging: false,
  },
  jwtPrivateKey: 'jwtPrivateKey',
};
