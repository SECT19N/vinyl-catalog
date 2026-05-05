import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ReviewsModule } from './reviews/reviews.module';
import { VinylsModule } from './vinyls/vinyls.module';
import { CollectionsModule } from './collections/collections.module';
import { ArtistsModule } from './artists/artists.module';

@Module({
  imports: [
    UsersModule,
    ReviewsModule,
    VinylsModule,
    CollectionsModule,
    ArtistsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
