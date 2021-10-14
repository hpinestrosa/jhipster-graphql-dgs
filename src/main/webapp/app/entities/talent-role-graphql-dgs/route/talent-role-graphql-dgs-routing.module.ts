import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { TalentRoleGraphqlDgsComponent } from '../list/talent-role-graphql-dgs.component';
import { TalentRoleGraphqlDgsDetailComponent } from '../detail/talent-role-graphql-dgs-detail.component';
import { TalentRoleGraphqlDgsUpdateComponent } from '../update/talent-role-graphql-dgs-update.component';
import { TalentRoleGraphqlDgsRoutingResolveService } from './talent-role-graphql-dgs-routing-resolve.service';

const talentRoleRoute: Routes = [
  {
    path: '',
    component: TalentRoleGraphqlDgsComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: TalentRoleGraphqlDgsDetailComponent,
    resolve: {
      talentRole: TalentRoleGraphqlDgsRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: TalentRoleGraphqlDgsUpdateComponent,
    resolve: {
      talentRole: TalentRoleGraphqlDgsRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: TalentRoleGraphqlDgsUpdateComponent,
    resolve: {
      talentRole: TalentRoleGraphqlDgsRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(talentRoleRoute)],
  exports: [RouterModule],
})
export class TalentRoleGraphqlDgsRoutingModule {}
