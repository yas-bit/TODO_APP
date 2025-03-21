import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { UserModule } from '../user/user.module';

@Module({
    imports: [JwtModule, UserModule],
    providers: [JwtStrategy],
})
export class AuthModule {}