import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UsePipes,
  ValidationPipe,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { ProjectService } from '../services/project.service';
import { CreateProjectDto } from '../dto/create-project.dto';
import { UpdateProjectDto } from '../dto/update-project.dto';

@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req: Express.Request, file: Express.Multer.File, cb: (error: Error | null, filename: string) => void) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          cb(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
    })
  )
  @UsePipes(new ValidationPipe({ transform: true }))
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: CreateProjectDto
  ) {
    const imageUrl = file ? `/uploads/${file.filename}` : body.imageUrl;
    return await this.projectService.create({
      ...body,
      imageUrl,
    });
  }

  @Get()
  async findAll() {
    return await this.projectService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.projectService.findOne(id);
  }

  @Put(':id')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req: Express.Request, file: Express.Multer.File, cb: (error: Error | null, filename: string) => void) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          cb(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
    })
  )
  @UsePipes(new ValidationPipe({ transform: true }))
  async update(
    @Param('id') id: number,
    @UploadedFile() file: Express.Multer.File,
    @Body() body: UpdateProjectDto
  ) {
    const imageUrl = file ? `/uploads/${file.filename}` : body.imageUrl;
    return await this.projectService.update(id, { ...body, imageUrl });
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    await this.projectService.remove(id);
    return { message: 'Project deleted' };
  }
}