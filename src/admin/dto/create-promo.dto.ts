import { IsString, Matches } from 'class-validator';

export class CreatePromoDto {
  @IsString()
  @Matches(/^[A-Za-z0-9А-Яа-я]+$/, { message: 'Код может содержать только латинские буквы, цифры и кириллицу' })
  code!: string;
}