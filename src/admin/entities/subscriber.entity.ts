import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Subscriber {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  chatId!: string;

  @Column({ default: true })
  posters!: boolean;

  @Column({ default: true })
  projects!: boolean;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt!: Date;
}

