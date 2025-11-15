import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Poster {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column()
  description!: string;

  @Column({ nullable: true })
  imageUrl?: string;

  @Column({ nullable: true })
  bookingUrl?: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt!: Date;
}