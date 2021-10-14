import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { TalentTitleGraphqlDgsComponent } from './list/talent-title-graphql-dgs.component';
import { TalentTitleGraphqlDgsDetailComponent } from './detail/talent-title-graphql-dgs-detail.component';
import { TalentTitleGraphqlDgsUpdateComponent } from './update/talent-title-graphql-dgs-update.component';
import { TalentTitleGraphqlDgsDeleteDialogComponent } from './delete/talent-title-graphql-dgs-delete-dialog.component';
import { TalentTitleGraphqlDgsRoutingModule } from './route/talent-title-graphql-dgs-routing.module';

@NgModule({
  imports: [SharedModule, TalentTitleGraphqlDgsRoutingModule],
  declarations: [
    TalentTitleGraphqlDgsComponent,
    TalentTitleGraphqlDgsDetailComponent,
    TalentTitleGraphqlDgsUpdateComponent,
    TalentTitleGraphqlDgsDeleteDialogComponent,
  ],
  entryComponents: [TalentTitleGraphqlDgsDeleteDialogComponent],
})
export class TalentTitleGraphqlDgsModule {}
