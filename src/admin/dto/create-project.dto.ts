import { IsString, IsUrl, IsOptional } from 'class-validator';

export class CreateProjectDto {
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