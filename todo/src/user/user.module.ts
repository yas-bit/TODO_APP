import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
	imports: [TypeOrmModule.forFeature([User]), JwtModule],
	providers: [UserService],
	controllers: [UserController],
	exports: [UserService, TypeOrmModule.forFeature([User])]
})
export class UserModule {}
