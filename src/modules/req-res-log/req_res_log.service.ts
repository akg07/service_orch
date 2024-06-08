import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Log } from "./req_res_log.model";
import { Injectable } from "@nestjs/common";

@Injectable()
export class ReqResLogService {

  constructor(
    @InjectModel('req_res_log') private readonly logModel: Model<Log>
  ) {}

  async log(data: Partial<Log>): Promise<void> {
    const createLog = new this.logModel(data);
    await createLog.save();
  }
}