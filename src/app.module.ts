import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
  UseFilters,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { CatsController } from './cats/cats.controller';
import { CatsService } from './cats/cats.service';
import { AppService } from './app.service';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { logger } from './middleware/logger.nextFunction.middleware';
import { HttpExceptionFilter } from 'src/exception/httpExceptionFilter';
import { APP_FILTER } from '@nestjs/core';
@Module({
  imports: [],
  controllers: [AppController, CatsController],
  providers: [
    AppService,
    CatsService,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule implements NestModule {
  async configure(consumer: MiddlewareConsumer) {
    // consumer.apply(LoggerMiddleware).forRoutes('cats');
    consumer.apply(logger).forRoutes(CatsController);
    await new Promise((resolve) => {
      resolve(1);
    });
    setTimeout(() => {
      //
      console.log('await~~~~~');
    }, 0);
  }
}
