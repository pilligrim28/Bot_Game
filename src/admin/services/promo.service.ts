// src/admin/services/promo.service.ts
import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, LessThanOrEqual } from 'typeorm';
import { Promo } from '../entities/promo.entity';
import { CreatePromoDto } from '../dto/create-promo.dto';

@Injectable()
export class PromoService implements OnModuleInit, OnModuleDestroy {
  constructor(
    @InjectRepository(Promo)
    private promoRepository: Repository<Promo>,
  ) {}

  private cleanupInterval: NodeJS.Timeout | null = null;

  async onModuleInit() {
    // run immediate cleanup and schedule hourly cleanup
    await this.deleteExpiredPromos().catch((e) => console.error('Promo cleanup error', e));
    this.cleanupInterval = setInterval(() => {
      this.deleteExpiredPromos().catch((e) => console.error('Promo cleanup error', e));
    }, 1000 * 60 * 60);
  }

  async onModuleDestroy() {
    if (this.cleanupInterval) clearInterval(this.cleanupInterval);
  }

  async create(createPromoDto: CreatePromoDto): Promise<Promo> {
    const promo = this.promoRepository.create({
      code: createPromoDto.code,
      expiresAt: createPromoDto.expiresAt ? new Date(createPromoDto.expiresAt) : null,
    });
    return await this.promoRepository.save(promo);
  }

  async findAll(): Promise<Promo[]> {
    return await this.promoRepository.find();
  }

  async deleteExpiredPromos(): Promise<void> {
    const now = new Date();
    await this.promoRepository.delete({ expiresAt: LessThanOrEqual(now) });
  }
}