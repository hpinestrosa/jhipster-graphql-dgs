import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { TitlePrincipalGraphqlDgsComponent } from './list/title-principal-graphql-dgs.component';
import { TitlePrincipalGraphqlDgsDetailComponent } from './detail/title-principal-graphql-dgs-detail.component';
import { TitlePrincipalGraphqlDgsUpdateComponent } from './update/title-principal-graphql-dgs-update.component';
import { TitlePrincipalGraphqlDgsDeleteDialogComponent } from './delete/title-principal-graphql-dgs-delete-dialog.component';
import { TitlePrincipalGraphqlDgsRoutingModule } from './route/title-principal-graphql-dgs-routing.module';

@NgModule({
  imports: [SharedModule, TitlePrincipalGraphqlDgsRoutingModule],
  declarations: [
    TitlePrincipalGraphqlDgsComponent,
    TitlePrincipalGraphqlDgsDetailComponent,
    TitlePrincipalGraphqlDgsUpdateComponent,
    TitlePrincipalGraphqlDgsDeleteDialogComponent,
  ],
  entryComponents: [TitlePrincipalGraphqlDgsDeleteDialogComponent],
})
export class TitlePrincipalGraphqlDgsModule {}
