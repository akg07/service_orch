import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) {}


  @Post('/signup')
  signUp(@Body() signUp: any): Promise<{ token: string }> {
    return this.authService.signUp(signUp);
  }


  @Get('login')
  login(@Body() data: any): Promise<{ token: string }> {
    try{
      return this.authService.login(data);
    }catch(err) {
      console.log(err);
    }
  }
}
