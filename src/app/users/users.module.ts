import { Module } from '@nestjs/common'
import { UsersController } from './users.controller'
import { usersProviders } from './users.providers'
import { UsersService } from './users.service'
import { JwtStrategy } from './auth/jwt-strategy'
import { PassportModule } from '@nestjs/passport'

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt', session: false }),
  ],
  controllers: [UsersController],
  providers: [UsersService, ...usersProviders, JwtStrategy],
  exports: [UsersService],
})
export class UsersModule {}
