import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { GenreGraphqlDgsComponent } from './list/genre-graphql-dgs.component';
import { GenreGraphqlDgsDetailComponent } from './detail/genre-graphql-dgs-detail.component';
import { GenreGraphqlDgsUpdateComponent } from './update/genre-graphql-dgs-update.component';
import { GenreGraphqlDgsDeleteDialogComponent } from './delete/genre-graphql-dgs-delete-dialog.component';
import { GenreGraphqlDgsRoutingModule } from './route/genre-graphql-dgs-routing.module';

@NgModule({
  imports: [SharedModule, GenreGraphqlDgsRoutingModule],
  declarations: [
    GenreGraphqlDgsComponent,
    GenreGraphqlDgsDetailComponent,
    GenreGraphqlDgsUpdateComponent,
    GenreGraphqlDgsDeleteDialogComponent,
  ],
  entryComponents: [GenreGraphqlDgsDeleteDialogComponent],
})
export class GenreGraphqlDgsModule {}
