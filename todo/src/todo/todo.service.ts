import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Todo } from './todo.entity';

@Injectable()
export class TodoService {
    constructor(
        @InjectRepository(Todo)
        private todoRepository: Repository<Todo>,
    ) {}

    async createTask(userId: number, title: string, description: string) {
        const todo = this.todoRepository.create({ title, description });
        return this.todoRepository.save(todo);
    }

    async getTasksByUser(userId: number){
        return this.todoRepository.find({ where: { user: { id: userId } } });
    }

    async updateTask(id: number, title: string, description: string) {
        const task = await this.todoRepository.findOne({ where: { id } });
        if (!task)
            throw new Error('Todo not found');
        task.title = title;
        task.description = description;
        return this.todoRepository.save(task);
    }

    async deleteTask(id: number){
        await this.todoRepository.delete(id);
    }
}