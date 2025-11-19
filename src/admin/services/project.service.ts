import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from '../entities/project.entity';
import { CreateProjectDto } from '../dto/create-project.dto';
import { UpdateProjectDto } from '../dto/update-project.dto'; // ✅ Правильное имя

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private projectRepository: Repository<Project>,
  ) {}

  async create(createProjectDto: CreateProjectDto): Promise<Project> {
    const project = this.projectRepository.create(createProjectDto);
    return await this.projectRepository.save(project);
  }

  async findAll(): Promise<Project[]> {
    return await this.projectRepository.find();
  }

  async findOne(id: number): Promise<Project | null> {
    return await this.projectRepository.findOne({ where: { id } });
  }

  async update(id: number, updateProjectDto: UpdateProjectDto): Promise<Project | null> {
    const existing = await this.projectRepository.findOne({ where: { id } });
    if (!existing) {
      return null;
    }

    await this.projectRepository.update(id, updateProjectDto);
    return await this.projectRepository.findOne({ where: { id } });
  }

  async remove(id: number): Promise<void> {
    await this.projectRepository.delete(id);
  }
}