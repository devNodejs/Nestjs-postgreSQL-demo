import { Module } from '@nestjs/common';
import { UsersModule } from './app/users/users.module';
import { SharedModule } from './shared/shared.module';
import { Routes, RouterModule } from 'nest-router';
import { DatabaseModule } from '../src/database/database.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { MorganModule, MorganInterceptor } from 'nest-morgan';

const routes: Routes = [
  {
    path: '/route',
    module: UsersModule,
  },
];

@Module({
  imports: [
    DatabaseModule,
    UsersModule,
    SharedModule,
    RouterModule.forRoutes(routes),
    MorganModule.forRoot(),
  ],
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: MorganInterceptor('dev'),
    },
  ],
})
export class AppModule {}
