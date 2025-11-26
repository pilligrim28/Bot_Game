// src/main.ts
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { existsSync } from 'fs';
import { Request, Response } from 'express';
import { AppModule } from './app.module';
import 'dotenv/config';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors();

  // Serve uploaded files (images) under /uploads
  app.useStaticAssets(join(__dirname, '..', 'uploads'), {
    prefix: '/uploads',
  });

  // If a frontend build exists, serve it as static SPA
  const spaPath = join(__dirname, '..', 'frontend', 'dist');
  if (existsSync(spaPath)) {
    // serve static files from frontend/dist
    app.useStaticAssets(spaPath, { prefix: '/', index: false });
    // fallback to index.html for SPA routes (use underlying Express instance)
    const server = app.getHttpAdapter().getInstance();
    if (server && typeof server.get === 'function') {
      server.get('*', (req: Request, res: Response) => {
        res.sendFile(join(spaPath, 'index.html'));
      });
    }
  }

  await app.listen(process.env.PORT || 3005);
}

bootstrap();