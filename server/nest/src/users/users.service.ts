import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { LoginUserDto } from './dto/login-user.dto';
import { RegisterUserDto } from './dto/register-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { hash, compare } from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly UserRepo: Repository<User>,
  ) {}

  async register(data: RegisterUserDto) {
    const userWithThatProps = await this.UserRepo.findOne({
      where: [{ username: data.username }, { email: data.email }],
    });
    if (userWithThatProps)
      throw new HttpException(
        'User with that email or username already exist',
        HttpStatus.CONFLICT,
      );
    const hashedPassword = await hash(data.password, 15);
    const newUserEntity = this.UserRepo.create({
      ...data,
      password: hashedPassword,
    });
    const newUser = await this.UserRepo.save(newUserEntity);
    return { username: newUser.username, id: newUser.id };
  }

  async login(data: LoginUserDto, v: 'v1.1' | 'v1.2' = 'v1.1') {
    const userWithThatUsername = await this.UserRepo.findOne({
      where: { username: data.username },
    });
    if (!userWithThatUsername)
      throw new HttpException(
        'Incorrect username and password combination',
        HttpStatus.NOT_FOUND,
      );
    if (!(await compare(data.password, userWithThatUsername.password)))
      throw new HttpException(
        'Incorrect username and password combination',
        HttpStatus.NOT_FOUND,
      );
    return { username: data.username, id: userWithThatUsername.id };
  }
  async delete(id: number) {
    return await this.UserRepo.delete({ id });
  }
  // findAll(v: 'v1.1' | 'v1.2' = 'v1.1') {
  //   return `This action returns all users`;
  // }

  // findOne(id: number, v: 'v1.1' | 'v1.2' = 'v1.1') {
  //   return `This action returns a #${id} user`;
  // }

  // update(
  //   id: number,
  //   updateUserDto: UpdateUserDto,
  //   v: 'v1.1' | 'v1.2' = 'v1.1',
  // ) {
  //   return `This action updates a #${id} user`;
  // }

  // remove(id: number, v: 'v1.1' | 'v1.2' = 'v1.1') {
  //   return `This action removes a #${id} user`;
  // }
}
