import { environment } from '../../environment';
const envConfig = environment[process.env.NODE_ENV];
import * as moment from 'moment';

export const config = {
  JWTSecret: 'Santosh',
  JWTExpireTime: 86400,
};
