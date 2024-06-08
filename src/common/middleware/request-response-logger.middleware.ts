import { Injectable, Logger, NestMiddleware } from "@nestjs/common";
import { ReqResLogService } from "src/modules/req-res-log/req_res_log.service";


@Injectable()
export class ReqResLoggerMiddleware implements NestMiddleware{
  private readonly logger = new Logger('req-res-logger');

  constructor(private readonly logService: ReqResLogService) {}


  async use(req: any, res: any, next: (error?: any) => void) {
    
    const start = Date.now();
    const {method, originalUrl, body} = req;

    const originalSend = res.send;
    res.send = async (responseBody: any) => {

      const duration = Date.now() - start;
      const {statusCode} = res;

      this.logger.log(`${method} ${originalUrl} - ${statusCode} [${duration}ms]`);
      
      try{
        await this.logService.log({method, originalUrl, requestBody:body, statusCode, duration, responseBody});
      }catch(error) {
        console.log('req-res-log error: ', error);
      }

      return originalSend.call(res, responseBody);
    }
    next();
  }


}