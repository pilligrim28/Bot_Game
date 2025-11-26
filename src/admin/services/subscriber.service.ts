import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Subscriber } from '../entities/subscriber.entity';

@Injectable()
export class SubscriberService {
  constructor(
    @InjectRepository(Subscriber)
    private subscriberRepository: Repository<Subscriber>,
  ) {}

  async subscribe(chatId: string, posters = true, projects = true): Promise<Subscriber> {
    let existing = await this.subscriberRepository.findOne({ where: { chatId } });
    if (existing) {
      existing.posters = posters;
      existing.projects = projects;
      return this.subscriberRepository.save(existing);
    }
    const s = this.subscriberRepository.create({ chatId, posters, projects });
    return this.subscriberRepository.save(s);
  }

  async unsubscribe(chatId: string): Promise<void> {
    await this.subscriberRepository.delete({ chatId });
  }

  async findAll(): Promise<Subscriber[]> {
    return this.subscriberRepository.find();
  }
}
