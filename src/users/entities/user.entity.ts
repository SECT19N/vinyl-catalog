import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserFollow } from './user-follow.entity';

export enum UserRole {
  USER = 'user',
  MODERATOR = 'moderator',
  ADMIN = 'admin',
}

export enum SubscriptionTier {
  FREE = 'free',
  PREMIUM = 'premium',
  COLLECTOR = 'collector',
}

@Entity('users')
@Index(['isActive', 'isBanned'])
@Index(['email', 'deletedAt'])
@Index(['username', 'deletedAt'])
export class User {
  @PrimaryGeneratedColumn('uuid')
  @Index()
  id: string;

  @Column({ unique: true })
  @Index()
  email: string;

  @Column({ unique: true })
  @Index()
  username: string;

  @Column({ select: false })
  password: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.USER })
  @Index()
  role: UserRole;

  @Column({
    type: 'enum',
    enum: SubscriptionTier,
    default: SubscriptionTier.FREE,
  })
  subscriptionTier: SubscriptionTier;

  @Column({ nullable: true, type: 'text' })
  bio?: string;

  @Column({ nullable: true })
  avatarUrl: string;

  @Column({ default: true })
  isActive: boolean;

  @Column({ default: false })
  isVerified: boolean;

  @Column({ default: false })
  @Index()
  isBanned: boolean;

  @Column({ nullable: true, type: 'text' })
  banReason?: string;

  @DeleteDateColumn()
  @Index()
  deletedAt?: Date;

  @Column({ nullable: true })
  @Index()
  lastLoginAt?: Date;

  @Column({ default: 0 })
  loginCount: number;

  @Column({ nullable: true })
  @Index()
  lastActivityAt?: Date;

  @OneToMany(() => UserFollow, (follow) => follow.follower)
  following: UserFollow[];

  @OneToMany(() => UserFollow, (follow) => follow.following)
  followers: UserFollow[];

  @Column({ default: 0 })
  followingCount: number;

  @Column({ default: 0 })
  @Index()
  followersCount: number;

  @Column({ default: 0 })
  vinylCount: number;

  @Column({ default: 0 })
  collectionCount: number;

  @Column({ default: 0 })
  reviewCount: number;

  @CreateDateColumn()
  @Index()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
