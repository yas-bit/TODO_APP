import { Controller, Post, Body, ConflictException} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';


@Controller('user')
export class UserController {
    constructor(private userService: UserService) {}

    @Post('register')
    async register(@Body() createUserDto: CreateUserDto) {
        return this.userService.createUser(
            createUserDto.name,
            createUserDto.email,
            createUserDto.password,
        );
    }

    @Post('login')
    async login(@Body() loginUserDto: LoginUserDto) {
        const results = await this.userService.validateUser(
            loginUserDto.email,
            loginUserDto.password,
        );
        if (!results) {
            throw new ConflictException('Wrong email or password!');
        }
        return { message: 'Login successful', results };
    }
}
