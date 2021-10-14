import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { TalentGraphqlDgsComponent } from './list/talent-graphql-dgs.component';
import { TalentGraphqlDgsDetailComponent } from './detail/talent-graphql-dgs-detail.component';
import { TalentGraphqlDgsUpdateComponent } from './update/talent-graphql-dgs-update.component';
import { TalentGraphqlDgsDeleteDialogComponent } from './delete/talent-graphql-dgs-delete-dialog.component';
import { TalentGraphqlDgsRoutingModule } from './route/talent-graphql-dgs-routing.module';

@NgModule({
  imports: [SharedModule, TalentGraphqlDgsRoutingModule],
  declarations: [
    TalentGraphqlDgsComponent,
    TalentGraphqlDgsDetailComponent,
    TalentGraphqlDgsUpdateComponent,
    TalentGraphqlDgsDeleteDialogComponent,
  ],
  entryComponents: [TalentGraphqlDgsDeleteDialogComponent],
})
export class TalentGraphqlDgsModule {}
