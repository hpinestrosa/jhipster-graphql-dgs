import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { TitleGraphqlDgsComponent } from './list/title-graphql-dgs.component';
import { TitleGraphqlDgsDetailComponent } from './detail/title-graphql-dgs-detail.component';
import { TitleGraphqlDgsUpdateComponent } from './update/title-graphql-dgs-update.component';
import { TitleGraphqlDgsDeleteDialogComponent } from './delete/title-graphql-dgs-delete-dialog.component';
import { TitleGraphqlDgsRoutingModule } from './route/title-graphql-dgs-routing.module';

@NgModule({
  imports: [SharedModule, TitleGraphqlDgsRoutingModule],
  declarations: [
    TitleGraphqlDgsComponent,
    TitleGraphqlDgsDetailComponent,
    TitleGraphqlDgsUpdateComponent,
    TitleGraphqlDgsDeleteDialogComponent,
  ],
  entryComponents: [TitleGraphqlDgsDeleteDialogComponent],
})
export class TitleGraphqlDgsModule {}
