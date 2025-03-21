import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../user/user.entity';

@Entity('tasks') // map to the existing tasks table from the db
export class Todo {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @ManyToOne(() => User, (user) => user.todos)
    @JoinColumn({ name: 'user_id' }) // using this because i didnt name it userId so i guess it didnt map it correctly in the db
    user: User;
}