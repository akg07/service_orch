import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CONSTANT } from './common/utils/constants';
import { ReqResLoggerMiddleware } from './common/middleware/request-response-logger.middleware';
import { ReqResLogModule } from './modules/req-res-log/req_res_log.module';

@Module({
  imports: [
    MongooseModule.forRoot(CONSTANT.MONGODB_URI),
    UserModule,
    ReqResLogModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule{
  
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ReqResLoggerMiddleware).forRoutes('*');
  }
  
}
