import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { TitleTypeGraphqlDgsComponent } from './list/title-type-graphql-dgs.component';
import { TitleTypeGraphqlDgsDetailComponent } from './detail/title-type-graphql-dgs-detail.component';
import { TitleTypeGraphqlDgsUpdateComponent } from './update/title-type-graphql-dgs-update.component';
import { TitleTypeGraphqlDgsDeleteDialogComponent } from './delete/title-type-graphql-dgs-delete-dialog.component';
import { TitleTypeGraphqlDgsRoutingModule } from './route/title-type-graphql-dgs-routing.module';

@NgModule({
  imports: [SharedModule, TitleTypeGraphqlDgsRoutingModule],
  declarations: [
    TitleTypeGraphqlDgsComponent,
    TitleTypeGraphqlDgsDetailComponent,
    TitleTypeGraphqlDgsUpdateComponent,
    TitleTypeGraphqlDgsDeleteDialogComponent,
  ],
  entryComponents: [TitleTypeGraphqlDgsDeleteDialogComponent],
})
export class TitleTypeGraphqlDgsModule {}
