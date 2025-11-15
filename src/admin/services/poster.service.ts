import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Poster } from '../entities/poster.entity';
import { CreatePosterDto } from '../dto/create-poster.dto';

@Injectable()
export class PosterService {
  constructor(
    @InjectRepository(Poster)
    private posterRepository: Repository<Poster>,
  ) {}

  async create(createPosterDto: CreatePosterDto): Promise<Poster> {
    const poster = this.posterRepository.create(createPosterDto);
    return await this.posterRepository.save(poster);
  }

  async findAll(): Promise<Poster[]> {
    return await this.posterRepository.find();
  }
}