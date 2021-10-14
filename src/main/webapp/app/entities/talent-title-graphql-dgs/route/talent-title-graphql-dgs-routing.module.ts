import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { TalentTitleGraphqlDgsComponent } from '../list/talent-title-graphql-dgs.component';
import { TalentTitleGraphqlDgsDetailComponent } from '../detail/talent-title-graphql-dgs-detail.component';
import { TalentTitleGraphqlDgsUpdateComponent } from '../update/talent-title-graphql-dgs-update.component';
import { TalentTitleGraphqlDgsRoutingResolveService } from './talent-title-graphql-dgs-routing-resolve.service';

const talentTitleRoute: Routes = [
  {
    path: '',
    component: TalentTitleGraphqlDgsComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: TalentTitleGraphqlDgsDetailComponent,
    resolve: {
      talentTitle: TalentTitleGraphqlDgsRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: TalentTitleGraphqlDgsUpdateComponent,
    resolve: {
      talentTitle: TalentTitleGraphqlDgsRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: TalentTitleGraphqlDgsUpdateComponent,
    resolve: {
      talentTitle: TalentTitleGraphqlDgsRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(talentTitleRoute)],
  exports: [RouterModule],
})
export class TalentTitleGraphqlDgsRoutingModule {}
