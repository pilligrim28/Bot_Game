// src/admin/services/poster.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Poster } from '../entities/poster.entity';
import { CreatePosterDto } from '../dto/create-poster.dto';
import { UpdatePosterDto } from '../dto/update-poster.dto';

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

  async findOne(id: number): Promise<Poster | null> {
    return await this.posterRepository.findOne({ where: { id } });
  }

  async update(id: number, updatePosterDto: UpdatePosterDto): Promise<Poster | null> {
    const existing = await this.posterRepository.findOne({ where: { id } });
    if (!existing) {
      return null;
    }

    await this.posterRepository.update(id, updatePosterDto);
    return await this.posterRepository.findOne({ where: { id } });
  }

  async remove(id: number): Promise<void> {
    await this.posterRepository.delete(id);
  }
}