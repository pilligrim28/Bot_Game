import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  UploadedFile,
  UseInterceptors,
  Get,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { ProjectService } from '../services/project.service';
import { CreateProjectDto } from '../dto/create-project.dto';

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
}