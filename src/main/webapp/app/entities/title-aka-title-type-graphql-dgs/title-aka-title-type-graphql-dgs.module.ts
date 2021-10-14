import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { TitleAkaTitleTypeGraphqlDgsComponent } from './list/title-aka-title-type-graphql-dgs.component';
import { TitleAkaTitleTypeGraphqlDgsDetailComponent } from './detail/title-aka-title-type-graphql-dgs-detail.component';
import { TitleAkaTitleTypeGraphqlDgsUpdateComponent } from './update/title-aka-title-type-graphql-dgs-update.component';
import { TitleAkaTitleTypeGraphqlDgsDeleteDialogComponent } from './delete/title-aka-title-type-graphql-dgs-delete-dialog.component';
import { TitleAkaTitleTypeGraphqlDgsRoutingModule } from './route/title-aka-title-type-graphql-dgs-routing.module';

@NgModule({
  imports: [SharedModule, TitleAkaTitleTypeGraphqlDgsRoutingModule],
  declarations: [
    TitleAkaTitleTypeGraphqlDgsComponent,
    TitleAkaTitleTypeGraphqlDgsDetailComponent,
    TitleAkaTitleTypeGraphqlDgsUpdateComponent,
    TitleAkaTitleTypeGraphqlDgsDeleteDialogComponent,
  ],
  entryComponents: [TitleAkaTitleTypeGraphqlDgsDeleteDialogComponent],
})
export class TitleAkaTitleTypeGraphqlDgsModule {}
