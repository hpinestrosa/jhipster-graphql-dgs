import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { TitleGenreGraphqlDgsComponent } from './list/title-genre-graphql-dgs.component';
import { TitleGenreGraphqlDgsDetailComponent } from './detail/title-genre-graphql-dgs-detail.component';
import { TitleGenreGraphqlDgsUpdateComponent } from './update/title-genre-graphql-dgs-update.component';
import { TitleGenreGraphqlDgsDeleteDialogComponent } from './delete/title-genre-graphql-dgs-delete-dialog.component';
import { TitleGenreGraphqlDgsRoutingModule } from './route/title-genre-graphql-dgs-routing.module';

@NgModule({
  imports: [SharedModule, TitleGenreGraphqlDgsRoutingModule],
  declarations: [
    TitleGenreGraphqlDgsComponent,
    TitleGenreGraphqlDgsDetailComponent,
    TitleGenreGraphqlDgsUpdateComponent,
    TitleGenreGraphqlDgsDeleteDialogComponent,
  ],
  entryComponents: [TitleGenreGraphqlDgsDeleteDialogComponent],
})
export class TitleGenreGraphqlDgsModule {}
