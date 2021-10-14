import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { CategoryGraphqlDgsComponent } from '../list/category-graphql-dgs.component';
import { CategoryGraphqlDgsDetailComponent } from '../detail/category-graphql-dgs-detail.component';
import { CategoryGraphqlDgsUpdateComponent } from '../update/category-graphql-dgs-update.component';
import { CategoryGraphqlDgsRoutingResolveService } from './category-graphql-dgs-routing-resolve.service';

const categoryRoute: Routes = [
  {
    path: '',
    component: CategoryGraphqlDgsComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: CategoryGraphqlDgsDetailComponent,
    resolve: {
      category: CategoryGraphqlDgsRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: CategoryGraphqlDgsUpdateComponent,
    resolve: {
      category: CategoryGraphqlDgsRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: CategoryGraphqlDgsUpdateComponent,
    resolve: {
      category: CategoryGraphqlDgsRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(categoryRoute)],
  exports: [RouterModule],
})
export class CategoryGraphqlDgsRoutingModule {}
