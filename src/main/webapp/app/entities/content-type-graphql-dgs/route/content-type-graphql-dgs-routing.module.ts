import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ContentTypeGraphqlDgsComponent } from '../list/content-type-graphql-dgs.component';
import { ContentTypeGraphqlDgsDetailComponent } from '../detail/content-type-graphql-dgs-detail.component';
import { ContentTypeGraphqlDgsUpdateComponent } from '../update/content-type-graphql-dgs-update.component';
import { ContentTypeGraphqlDgsRoutingResolveService } from './content-type-graphql-dgs-routing-resolve.service';

const contentTypeRoute: Routes = [
  {
    path: '',
    component: ContentTypeGraphqlDgsComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: ContentTypeGraphqlDgsDetailComponent,
    resolve: {
      contentType: ContentTypeGraphqlDgsRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: ContentTypeGraphqlDgsUpdateComponent,
    resolve: {
      contentType: ContentTypeGraphqlDgsRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: ContentTypeGraphqlDgsUpdateComponent,
    resolve: {
      contentType: ContentTypeGraphqlDgsRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(contentTypeRoute)],
  exports: [RouterModule],
})
export class ContentTypeGraphqlDgsRoutingModule {}
