import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { LanguageGraphqlDgsComponent } from '../list/language-graphql-dgs.component';
import { LanguageGraphqlDgsDetailComponent } from '../detail/language-graphql-dgs-detail.component';
import { LanguageGraphqlDgsUpdateComponent } from '../update/language-graphql-dgs-update.component';
import { LanguageGraphqlDgsRoutingResolveService } from './language-graphql-dgs-routing-resolve.service';

const languageRoute: Routes = [
  {
    path: '',
    component: LanguageGraphqlDgsComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: LanguageGraphqlDgsDetailComponent,
    resolve: {
      language: LanguageGraphqlDgsRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: LanguageGraphqlDgsUpdateComponent,
    resolve: {
      language: LanguageGraphqlDgsRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: LanguageGraphqlDgsUpdateComponent,
    resolve: {
      language: LanguageGraphqlDgsRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(languageRoute)],
  exports: [RouterModule],
})
export class LanguageGraphqlDgsRoutingModule {}
