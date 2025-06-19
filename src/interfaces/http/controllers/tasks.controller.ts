import {
  Controller,
  Post,
  Body,
  Get,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { CreateTaskUseCase } from 'src/application/use-cases/create-task.use-case';
import { ListTasksUseCase } from 'src/application/use-cases/list-tasks.use-case';
import { CompleteTaskUseCase } from 'src/application/use-cases/complete-task.use-case';
import { DeleteTaskUseCase } from 'src/application/use-cases/delete-task.use-case';
import { CreateTaskDto } from '../dtos/create-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(
    private readonly createTaskUseCase: CreateTaskUseCase,
    private readonly listTasksUseCase: ListTasksUseCase,
    private readonly completeTaskUseCase: CompleteTaskUseCase,
    private readonly deleteTaskUseCase: DeleteTaskUseCase,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createTaskDto: CreateTaskDto) {
    return this.createTaskUseCase.execute(createTaskDto);
  }

  @Get()
  async findAll() {
    return this.listTasksUseCase.execute();
  }

  @Patch(':id/complete')
  @HttpCode(HttpStatus.NO_CONTENT)
  async complete(@Param('id') id: string) {
    return this.completeTaskUseCase.execute({ taskId: id });
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string) {
    return this.deleteTaskUseCase.execute({ taskId: id });
  }
}
