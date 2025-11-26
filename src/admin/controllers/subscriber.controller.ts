import { Controller, Post, Body, Delete, Param, Get } from '@nestjs/common';
import { SubscriberService } from '../services/subscriber.service';

@Controller('subscribe')
export class SubscriberController {
  constructor(private readonly subscriberService: SubscriberService) {}

  @Post()
  async subscribe(@Body() body: { chatId: string; posters?: boolean; projects?: boolean }) {
    const { chatId, posters = true, projects = true } = body;
    return await this.subscriberService.subscribe(chatId, posters, projects);
  }

  @Delete(':chatId')
  async unsubscribe(@Param('chatId') chatId: string) {
    await this.subscriberService.unsubscribe(chatId);
    return { message: 'Unsubscribed' };
  }

  @Get()
  async findAll() {
    return await this.subscriberService.findAll();
  }
}
