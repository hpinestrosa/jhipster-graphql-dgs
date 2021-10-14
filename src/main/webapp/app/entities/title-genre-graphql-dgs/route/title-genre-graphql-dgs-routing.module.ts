import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { TitleGenreGraphqlDgsComponent } from '../list/title-genre-graphql-dgs.component';
import { TitleGenreGraphqlDgsDetailComponent } from '../detail/title-genre-graphql-dgs-detail.component';
import { TitleGenreGraphqlDgsUpdateComponent } from '../update/title-genre-graphql-dgs-update.component';
import { TitleGenreGraphqlDgsRoutingResolveService } from './title-genre-graphql-dgs-routing-resolve.service';

const titleGenreRoute: Routes = [
  {
    path: '',
    component: TitleGenreGraphqlDgsComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: TitleGenreGraphqlDgsDetailComponent,
    resolve: {
      titleGenre: TitleGenreGraphqlDgsRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: TitleGenreGraphqlDgsUpdateComponent,
    resolve: {
      titleGenre: TitleGenreGraphqlDgsRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: TitleGenreGraphqlDgsUpdateComponent,
    resolve: {
      titleGenre: TitleGenreGraphqlDgsRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(titleGenreRoute)],
  exports: [RouterModule],
})
export class TitleGenreGraphqlDgsRoutingModule {}
