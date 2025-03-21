import { Entity, PrimaryGeneratedColumn, Column, Unique, OneToMany } from 'typeorm';
import { Todo } from '../todo/todo.entity';

@Entity('users') //the name here must match the table in the database
@Unique(['email'])
export class User { // The class name User is the name of the ts class that represents the entity. It doesn’t have to match the table name (users) in the database.
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @OneToMany(() => Todo, (todo) => todo.user)
    todos: Todo[];
}