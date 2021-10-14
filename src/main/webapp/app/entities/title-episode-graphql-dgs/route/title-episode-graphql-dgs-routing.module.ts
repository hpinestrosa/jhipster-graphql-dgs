import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { TitleEpisodeGraphqlDgsComponent } from '../list/title-episode-graphql-dgs.component';
import { TitleEpisodeGraphqlDgsDetailComponent } from '../detail/title-episode-graphql-dgs-detail.component';
import { TitleEpisodeGraphqlDgsUpdateComponent } from '../update/title-episode-graphql-dgs-update.component';
import { TitleEpisodeGraphqlDgsRoutingResolveService } from './title-episode-graphql-dgs-routing-resolve.service';

const titleEpisodeRoute: Routes = [
  {
    path: '',
    component: TitleEpisodeGraphqlDgsComponent,
    data: {
      defaultSort: 'id,asc',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: TitleEpisodeGraphqlDgsDetailComponent,
    resolve: {
      titleEpisode: TitleEpisodeGraphqlDgsRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: TitleEpisodeGraphqlDgsUpdateComponent,
    resolve: {
      titleEpisode: TitleEpisodeGraphqlDgsRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: TitleEpisodeGraphqlDgsUpdateComponent,
    resolve: {
      titleEpisode: TitleEpisodeGraphqlDgsRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(titleEpisodeRoute)],
  exports: [RouterModule],
})
export class TitleEpisodeGraphqlDgsRoutingModule {}
