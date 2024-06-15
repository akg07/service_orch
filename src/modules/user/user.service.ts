import { ConflictException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { User, UserSchema } from "./user.model";
import { Model } from "mongoose";
import { CreateUserDto } from "./user.dto";
import * as bcrypt from 'bcrypt';


@Injectable()
export class UserService{

  constructor(
    @InjectModel('User') private readonly userModel: Model<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User>{
    try{
      const newUser = new this.userModel(createUserDto);
      return await newUser.save();
    }catch(error) {
      if(error.code === 11000) {
        throw new ConflictException('User already exists');
      }
      throw error;
    }
  }

  async remove(id: string): Promise<void> {
    try{
      const update_value = {is_active: false};
      return await this.userModel.findByIdAndUpdate(id, update_value, {new: true});
    }catch(error) {
      throw new ConflictException('Users remove error');
    }
  }

  async update(id: string, userDto: CreateUserDto): Promise<User> {
    try{
      const updatedUser = await this.userModel.findByIdAndUpdate(id, userDto, {new: true});
      return updatedUser;
    }catch(error) {
      if(error.code === 11000) {
        throw new ConflictException('User already exists');
      }
      throw error;
    }
  }

  async findOne(data: any): Promise<User | null>{
    let payload = {is_active: true}
    const { id, email } = data;
    console.log(data);
    
    if(id) { payload['_id'] = id; }
    else if(email) { payload['email'] = email; }

    console.log(payload);
    
    const user = this.userModel.findOne(payload).exec();
    
    if(!user) return null;
    return user;
  }

  async findAll() {
    return this.userModel.find({is_active: true}).exec();
  }

  async findAllRemovedUser() {
    return this.userModel.find({is_active: false}).exec();
  }

  async findByQuery(query: any) {
    return this.userModel.find(query).exec();
  } 

  async comparePassword(providedPassword: string, storedPassword: string): Promise<Boolean> {
    return bcrypt.compare(providedPassword, storedPassword);
  }

  async validate(email: string, pass: string): Promise<Boolean> {
    try{
      const user = await this.findByQuery({email});
      if(user.length == 0) return false;

      // validate password
      return await this.comparePassword(pass, user[0].password);
    }catch(err){ console.log(err); }
  }
}