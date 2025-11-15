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
import { PosterService } from '../services/poster.service';
import { CreatePosterDto } from '../dto/create-poster.dto';

@Controller('poster')
export class PosterController {
  constructor(private readonly posterService: PosterService) {}

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
    @Body() body: CreatePosterDto
  ) {
    const imageUrl = file ? `/uploads/${file.filename}` : body.imageUrl;
    return await this.posterService.create({
      ...body,
      imageUrl,
    });
  }

  @Get()
  async findAll() {
    return await this.posterService.findAll();
  }
}