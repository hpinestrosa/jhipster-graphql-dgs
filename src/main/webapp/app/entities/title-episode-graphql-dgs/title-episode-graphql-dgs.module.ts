import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { TitleEpisodeGraphqlDgsComponent } from './list/title-episode-graphql-dgs.component';
import { TitleEpisodeGraphqlDgsDetailComponent } from './detail/title-episode-graphql-dgs-detail.component';
import { TitleEpisodeGraphqlDgsUpdateComponent } from './update/title-episode-graphql-dgs-update.component';
import { TitleEpisodeGraphqlDgsDeleteDialogComponent } from './delete/title-episode-graphql-dgs-delete-dialog.component';
import { TitleEpisodeGraphqlDgsRoutingModule } from './route/title-episode-graphql-dgs-routing.module';

@NgModule({
  imports: [SharedModule, TitleEpisodeGraphqlDgsRoutingModule],
  declarations: [
    TitleEpisodeGraphqlDgsComponent,
    TitleEpisodeGraphqlDgsDetailComponent,
    TitleEpisodeGraphqlDgsUpdateComponent,
    TitleEpisodeGraphqlDgsDeleteDialogComponent,
  ],
  entryComponents: [TitleEpisodeGraphqlDgsDeleteDialogComponent],
})
export class TitleEpisodeGraphqlDgsModule {}
