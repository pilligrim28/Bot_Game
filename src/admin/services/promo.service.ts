// src/admin/services/promo.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Promo } from '../entities/promo.entity';
import { CreatePromoDto } from '../dto/create-promo.dto';

@Injectable()
export class PromoService {
  constructor(
    @InjectRepository(Promo)
    private promoRepository: Repository<Promo>,
  ) {}

  async create(createPromoDto: CreatePromoDto): Promise<Promo> {
    const promo = this.promoRepository.create(createPromoDto);
    return await this.promoRepository.save(promo);
  }

  async findAll(): Promise<Promo[]> {
    return await this.promoRepository.find();
  }
}