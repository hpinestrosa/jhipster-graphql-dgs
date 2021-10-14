import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { LanguageGraphqlDgsComponent } from './list/language-graphql-dgs.component';
import { LanguageGraphqlDgsDetailComponent } from './detail/language-graphql-dgs-detail.component';
import { LanguageGraphqlDgsUpdateComponent } from './update/language-graphql-dgs-update.component';
import { LanguageGraphqlDgsDeleteDialogComponent } from './delete/language-graphql-dgs-delete-dialog.component';
import { LanguageGraphqlDgsRoutingModule } from './route/language-graphql-dgs-routing.module';

@NgModule({
  imports: [SharedModule, LanguageGraphqlDgsRoutingModule],
  declarations: [
    LanguageGraphqlDgsComponent,
    LanguageGraphqlDgsDetailComponent,
    LanguageGraphqlDgsUpdateComponent,
    LanguageGraphqlDgsDeleteDialogComponent,
  ],
  entryComponents: [LanguageGraphqlDgsDeleteDialogComponent],
})
export class LanguageGraphqlDgsModule {}
