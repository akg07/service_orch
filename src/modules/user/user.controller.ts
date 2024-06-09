import { Body, Controller, Delete, Get, Param, Post, Put, Query } from "@nestjs/common";
import { UserService } from "./user.service";
import { User } from "./user.model";
import { CreateUserDto } from "./user.dto";


@Controller('users')
export class UserController{

  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto){
    return this.userService.create(createUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.userService.remove(id);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<User | null> {
    return this.userService.findOne(id);
  }

  
  @Get()
  fingByQuery(@Query() query: any) {
    return this.userService.findByQuery(query);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  findAllDeleted() {
    return this.userService.findAllRemovedUser();
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: CreateUserDto): Promise<User> {
    return this.userService.update(id, data);
  }

}