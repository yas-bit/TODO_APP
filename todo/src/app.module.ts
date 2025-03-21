import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/user.entity';
import { UserModule } from './user/user.module';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TodoModule } from './todo/todo.module';
import { Todo } from './todo/todo.entity';

@Module({
	imports: [
		ConfigModule.forRoot({ isGlobal: true }),
		TypeOrmModule.forRoot({
			// temporary hardcoded values for development purposes only
			type: 'postgres',
			host: 'localhost',
			port: 5432,
			username: 'postgres',
			password: 'password',
			database: 'todo_db',
			entities: [User, Todo],
			synchronize: false,
		}),
    	PassportModule.register({ defaultStrategy: 'jwt' }),
    	UserModule,
    	TodoModule,
  ],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
