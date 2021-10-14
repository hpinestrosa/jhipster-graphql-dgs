import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { RoleGraphqlDgsComponent } from './list/role-graphql-dgs.component';
import { RoleGraphqlDgsDetailComponent } from './detail/role-graphql-dgs-detail.component';
import { RoleGraphqlDgsUpdateComponent } from './update/role-graphql-dgs-update.component';
import { RoleGraphqlDgsDeleteDialogComponent } from './delete/role-graphql-dgs-delete-dialog.component';
import { RoleGraphqlDgsRoutingModule } from './route/role-graphql-dgs-routing.module';

@NgModule({
  imports: [SharedModule, RoleGraphqlDgsRoutingModule],
  declarations: [
    RoleGraphqlDgsComponent,
    RoleGraphqlDgsDetailComponent,
    RoleGraphqlDgsUpdateComponent,
    RoleGraphqlDgsDeleteDialogComponent,
  ],
  entryComponents: [RoleGraphqlDgsDeleteDialogComponent],
})
export class RoleGraphqlDgsModule {}
