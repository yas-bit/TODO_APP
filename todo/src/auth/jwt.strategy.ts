import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { User } from '../user/user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {
    super({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        ignoreExpiration: false,
        secretOrKey: configService.get('JWT_SECRET') || 'fallback-secret-key',
        });
    }
    // This method is called when the token is valid. The returned object is attached to the request.user property, which can be used in controllers or guards.

    async validate(payload: {sub: number; email: string}) {
		console.log(payload)
		const user = await this.userRepository.findOne({
			where: {
				id: payload.sub // yeah sub is the id 
			},
		})

		if (!user) {
			throw new Error('User not found');
		}
		// Destructure to remove `hash`
		const { password, ...userWithoutHash } = user;
		return userWithoutHash;
	}
}