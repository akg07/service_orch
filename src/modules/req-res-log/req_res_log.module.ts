import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { LogSchema } from "./req_res_log.model";
import { ReqResLogService } from "./req_res_log.service";


@Module({
  imports: [MongooseModule.forFeature([{name: 'req_res_log', schema: LogSchema }])],
  providers: [ReqResLogService],
  exports: [ReqResLogService]
})
export class ReqResLogModule{}