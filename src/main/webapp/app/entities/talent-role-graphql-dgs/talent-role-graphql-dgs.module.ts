import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { TalentRoleGraphqlDgsComponent } from './list/talent-role-graphql-dgs.component';
import { TalentRoleGraphqlDgsDetailComponent } from './detail/talent-role-graphql-dgs-detail.component';
import { TalentRoleGraphqlDgsUpdateComponent } from './update/talent-role-graphql-dgs-update.component';
import { TalentRoleGraphqlDgsDeleteDialogComponent } from './delete/talent-role-graphql-dgs-delete-dialog.component';
import { TalentRoleGraphqlDgsRoutingModule } from './route/talent-role-graphql-dgs-routing.module';

@NgModule({
  imports: [SharedModule, TalentRoleGraphqlDgsRoutingModule],
  declarations: [
    TalentRoleGraphqlDgsComponent,
    TalentRoleGraphqlDgsDetailComponent,
    TalentRoleGraphqlDgsUpdateComponent,
    TalentRoleGraphqlDgsDeleteDialogComponent,
  ],
  entryComponents: [TalentRoleGraphqlDgsDeleteDialogComponent],
})
export class TalentRoleGraphqlDgsModule {}
