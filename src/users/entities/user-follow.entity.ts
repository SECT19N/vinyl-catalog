import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  Column,
  Index,
  JoinColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity('user_follows')
@Index(['followerId', 'followingId'], { unique: true })
export class UserFollow {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.following, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'followerId' })
  follower: User;

  @Column()
  followerId: string;

  @ManyToOne(() => User, (user) => user.followers, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'followingId' })
  following: User;

  @Column()
  followingId: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ default: true })
  notificationsEnabled: boolean;

  @Column({
    default: false,
  })
  isMuted: boolean;

  @Column({
    default: true,
  })
  isAccepted: boolean;
}
