import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { GenreGraphqlDgsComponent } from '../list/genre-graphql-dgs.component';
import { GenreGraphqlDgsDetailComponent } from '../detail/genre-graphql-dgs-detail.component';
import { GenreGraphqlDgsUpdateComponent } from '../update/genre-graphql-dgs-update.component';
import { GenreGraphqlDgsRoutingResolveService } from './genre-graphql-dgs-routing-resolve.service';

const genreRoute: Routes = [
  {
    path: '',
    component: GenreGraphqlDgsComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: GenreGraphqlDgsDetailComponent,
    resolve: {
      genre: GenreGraphqlDgsRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: GenreGraphqlDgsUpdateComponent,
    resolve: {
      genre: GenreGraphqlDgsRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: GenreGraphqlDgsUpdateComponent,
    resolve: {
      genre: GenreGraphqlDgsRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(genreRoute)],
  exports: [RouterModule],
})
export class GenreGraphqlDgsRoutingModule {}
