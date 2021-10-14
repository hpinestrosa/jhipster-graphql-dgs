import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { TalentGraphqlDgsComponent } from '../list/talent-graphql-dgs.component';
import { TalentGraphqlDgsDetailComponent } from '../detail/talent-graphql-dgs-detail.component';
import { TalentGraphqlDgsUpdateComponent } from '../update/talent-graphql-dgs-update.component';
import { TalentGraphqlDgsRoutingResolveService } from './talent-graphql-dgs-routing-resolve.service';

const talentRoute: Routes = [
  {
    path: '',
    component: TalentGraphqlDgsComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: TalentGraphqlDgsDetailComponent,
    resolve: {
      talent: TalentGraphqlDgsRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: TalentGraphqlDgsUpdateComponent,
    resolve: {
      talent: TalentGraphqlDgsRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: TalentGraphqlDgsUpdateComponent,
    resolve: {
      talent: TalentGraphqlDgsRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(talentRoute)],
  exports: [RouterModule],
})
export class TalentGraphqlDgsRoutingModule {}
