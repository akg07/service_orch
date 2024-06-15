import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signUp(signUp): Promise<{ token: string }> {
    const {name, email, password} = signUp;

    const user = await this.userService.create({email, name, password});

    const token = this.jwtService.sign({ id: user._id, name: user.name });
    return {
      token
    }
  }

  async login(login): Promise< { token: string }> {
    
    const {email, password} = login;
    
    const user = await this.userService.findOne({email});

    if(!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const isPasswordMatched = await this.userService.comparePassword(password, user.password);

    if(!isPasswordMatched) {
      throw new UnauthorizedException('Invalid email or password');
    }
    const token = this.jwtService.sign({ id: user._id, name: user.name });
    return {
      token
    }
  }
}
