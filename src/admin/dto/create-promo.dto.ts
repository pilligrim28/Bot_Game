import { IsString, Matches, IsOptional, IsISO8601 } from 'class-validator';

export class CreatePromoDto {
  @IsString()
  @Matches(/^[A-Za-z0-9А-Яа-я]+$/, { message: 'Код может содержать только латинские буквы, цифры и кириллицу' })
  code!: string;

  @IsOptional()
  @IsISO8601()
  expiresAt?: string;
}