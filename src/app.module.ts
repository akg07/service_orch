import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CONSTANT } from './common/utils/constants';

@Module({
  imports: [
    // DatabaseModule,
    MongooseModule.forRoot(CONSTANT.MONGODB_URI),
    UserModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
