import { Injectable, ConflictException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { JwtService } from '@nestjs/jwt';
import * as argon from 'argon2';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        private jwtService: JwtService,
        private config: ConfigService
    ) {}
    
    async findUserByEmail(email: string): Promise<User | null> { 
        return this.userRepository.findOne({ where: { email } });
    }

    async signToken(userId: number, email: string): Promise<{access_token: string}>
    {
        const payload = {
            sub: userId,
            email
        }
        const token = await this.jwtService.signAsync(payload, {
            expiresIn: '1h',
            secret: this.config.get('JWT_SECRET')
        })
        return { access_token: token }

    }
    async createUser(name: string, email: string, password: string) {
        const existingUser = await this.findUserByEmail(email);
        if (existingUser)
            throw new ConflictException('Email already used!');
        password = await argon.hash(password);
        const user = this.userRepository.create({ name, email, password });
        await this.userRepository.save(user);
        return this.signToken(user.id, user.email);
    }

    async validateUser(email: string, password: string) {
        const user = await this.findUserByEmail(email);
        if (!user)
            throw new ForbiddenException('Email does not exist')
        const pssMatch = await argon.verify(user.password, password)
        if (!pssMatch)
            throw new ForbiddenException('Wrong password')
        return this.signToken(user.id, user.email);
    }
}


