import { Body, Controller, Get, Post } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from 'src/tasks/task';
import { title } from 'process';
@Controller('tasks')
export class TasksController {
  //     tasksService:TasksService
  constructor(private tasksService: TasksService) {
    //     this.tasksService=tasksService;
  }
  @Get()
  getAllTasks(): Task[] {
    return this.tasksService.getAllTasks();
  }
  @Post()
  createTask(
    @Body('title') title: string,
    @Body('description') description: string,
  ): Task {
    return this.tasksService.createTask(title, description);
  }
}
