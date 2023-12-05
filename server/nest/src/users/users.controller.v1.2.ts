// /* eslint-disable prettier/prettier */
// import {
//   Controller,
//   Get,
//   Post,
//   Body,
//   Patch,
//   Param,
//   Delete,
// } from '@nestjs/common';
// import { UsersService } from './users.service';
// import { LoginUserDto } from './dto/login-user.dto';
// import { RegisterUserDto } from './dto/register-user.dto';

// @Controller('users/v1.2')
// export class UsersController {
//   constructor(private readonly usersService: UsersService) {}

//   @Post('')
//   register(@Body() body: RegisterUserDto) {
//     return this.usersService.create(createUserDto);
//   }

//   @Post()
//   login(@Body() body: LoginUserDto) {}

//   @Get(':id')
//   findOne(@Param('id') id: string) {
//     return this.usersService.findOne(+id);
//   }

//   // @Patch(':id')
//   // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
//   //   return this.usersService.update(+id, updateUserDto);
//   // }

//   // @Delete(':id')
//   // remove(@Param('id') id: string) {
//   //   return this.usersService.remove(+id);
//   // }
// }
