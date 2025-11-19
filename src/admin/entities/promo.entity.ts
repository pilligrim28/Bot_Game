import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Promo {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  code!: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt!: Date;
}