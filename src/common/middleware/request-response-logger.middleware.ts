import { Injectable, Logger, NestMiddleware } from "@nestjs/common";
import { ReqResLogService } from "src/modules/req-res-log/req_res_log.service";
import * as os from 'os';


@Injectable()
export class ReqResLoggerMiddleware implements NestMiddleware{
  private readonly logger = new Logger('req-res-logger');

  constructor(private readonly logService: ReqResLogService) {}

  async use(req: any, res: any, next: (error?: any) => void) {
    try{
      const start = Date.now();
      const {method, originalUrl, body} = req;

      // get system information
      const systemInformation = {
        platform: os.platform(),
        arch: os.arch(),
        totalMemory: os.totalmem(),
        freeMemory: os.freemem(),
        cpus: os.cpus(),
      }

      const originalSend = res.send;
      res.send = async (responseBody: any) => {

        const duration = Date.now() - start;
        const {statusCode} = res;

        this.logger.log(`${method} ${originalUrl} - ${statusCode} [${duration}ms]`);
        await this.logService.log({method, originalUrl, requestBody:body, statusCode, duration, responseBody, systemInformation});

        return originalSend.call(res, responseBody);
      }
      next();
    }
    catch(err) {
      console.error(err);
      next(err);
    }
    
  }


}