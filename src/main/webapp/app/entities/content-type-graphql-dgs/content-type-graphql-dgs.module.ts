import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { ContentTypeGraphqlDgsComponent } from './list/content-type-graphql-dgs.component';
import { ContentTypeGraphqlDgsDetailComponent } from './detail/content-type-graphql-dgs-detail.component';
import { ContentTypeGraphqlDgsUpdateComponent } from './update/content-type-graphql-dgs-update.component';
import { ContentTypeGraphqlDgsDeleteDialogComponent } from './delete/content-type-graphql-dgs-delete-dialog.component';
import { ContentTypeGraphqlDgsRoutingModule } from './route/content-type-graphql-dgs-routing.module';

@NgModule({
  imports: [SharedModule, ContentTypeGraphqlDgsRoutingModule],
  declarations: [
    ContentTypeGraphqlDgsComponent,
    ContentTypeGraphqlDgsDetailComponent,
    ContentTypeGraphqlDgsUpdateComponent,
    ContentTypeGraphqlDgsDeleteDialogComponent,
  ],
  entryComponents: [ContentTypeGraphqlDgsDeleteDialogComponent],
})
export class ContentTypeGraphqlDgsModule {}
