import { Controller, Post, Body, Get, Param, Put, Delete, UseGuards, Request } from '@nestjs/common';
import { TodoService } from './todo.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AuthGuard } from '@nestjs/passport';

@Controller('todo')
export class TodoController {
    constructor(private readonly todoService: TodoService) {}

    @UseGuards(AuthGuard('jwt'))
    @Post('create')
    async createTask(@Request() req, @Body() createTodoDto: { title: string; description: string }) {
        const userId = req.user.sub; // the user id from the token payload
        return this.todoService.createTask(userId, createTodoDto.title, createTodoDto.description);
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('myTasks')
    async getTaskaByUser(@Request() req) {
        const userId = req.user.user_id;
        return this.todoService.getTasksByUser(userId);
    }

    @UseGuards(AuthGuard('jwt'))
    @Put('update/:id')
    async updateTask(
        @Param('id') id: number,
        @Body() updateTodoDto: { title: string; description: string },
    ) {
        return this.todoService.updateTask(id, updateTodoDto.title, updateTodoDto.description);
    }

    @UseGuards(AuthGuard('jwt'))
    @Delete('delete/:id')
    async deleteTask(@Param('id') id: number) {
        return this.todoService.deleteTask(id);
    }
}