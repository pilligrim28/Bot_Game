// src/admin/controllers/promo.controller.ts
import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  Get,
} from '@nestjs/common';
import { PromoService } from '../services/promo.service';
import { CreatePromoDto } from '../dto/create-promo.dto';

@Controller('promo')
export class PromoController {
  constructor(private readonly promoService: PromoService) {}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  async create(@Body() body: CreatePromoDto) {
    return await this.promoService.create(body);
  }

  @Get()
  async findAll() {
    return await this.promoService.findAll();
  }
}