// src/app.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Poster } from './admin/entities/poster.entity';
import { Project } from './admin/entities/project.entity';
import { Promo } from './admin/entities/promo.entity'; // ✅
import { PosterService } from './admin/services/poster.service';
import { ProjectService } from './admin/services/project.service';
import { PromoService } from './admin/services/promo.service'; // ✅
import { PosterController } from './admin/controllers/poster.controller';
import { ProjectController } from './admin/controllers/project.controller';
import { PromoController } from './admin/controllers/promo.controller'; // ✅

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '5432', 10),
      username: process.env.DB_USERNAME || 'postgres',
      password: process.env.DB_PASSWORD || 'postgres',
      database: process.env.DB_NAME || 'telegram_bot',
      entities: [Poster, Project, Promo], // ✅ Добавь Promo
      synchronize: true, // ⚠️ Не использовать в продакшене
    }),
    TypeOrmModule.forFeature([Poster, Project, Promo]), // ✅ Добавь Promo
  ],
  controllers: [PosterController, ProjectController, PromoController], // ✅ Добавь PromoController
  providers: [PosterService, ProjectService, PromoService], // ✅ Добавь PromoService
})
export class AppModule {}