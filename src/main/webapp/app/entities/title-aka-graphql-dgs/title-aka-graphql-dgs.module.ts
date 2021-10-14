import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { TitleAkaGraphqlDgsComponent } from './list/title-aka-graphql-dgs.component';
import { TitleAkaGraphqlDgsDetailComponent } from './detail/title-aka-graphql-dgs-detail.component';
import { TitleAkaGraphqlDgsUpdateComponent } from './update/title-aka-graphql-dgs-update.component';
import { TitleAkaGraphqlDgsDeleteDialogComponent } from './delete/title-aka-graphql-dgs-delete-dialog.component';
import { TitleAkaGraphqlDgsRoutingModule } from './route/title-aka-graphql-dgs-routing.module';

@NgModule({
  imports: [SharedModule, TitleAkaGraphqlDgsRoutingModule],
  declarations: [
    TitleAkaGraphqlDgsComponent,
    TitleAkaGraphqlDgsDetailComponent,
    TitleAkaGraphqlDgsUpdateComponent,
    TitleAkaGraphqlDgsDeleteDialogComponent,
  ],
  entryComponents: [TitleAkaGraphqlDgsDeleteDialogComponent],
})
export class TitleAkaGraphqlDgsModule {}
