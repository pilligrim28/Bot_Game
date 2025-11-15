import { IsString, IsUrl, IsOptional } from 'class-validator';

export class CreatePosterDto {
  @IsString()
  title!: string;

  @IsString()
  description!: string;

  @IsUrl()
  @IsOptional()
  imageUrl?: string;

  @IsUrl()
  @IsOptional()
  bookingUrl?: string;
}