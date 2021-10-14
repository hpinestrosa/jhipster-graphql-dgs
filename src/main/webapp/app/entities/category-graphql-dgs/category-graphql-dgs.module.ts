import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { CategoryGraphqlDgsComponent } from './list/category-graphql-dgs.component';
import { CategoryGraphqlDgsDetailComponent } from './detail/category-graphql-dgs-detail.component';
import { CategoryGraphqlDgsUpdateComponent } from './update/category-graphql-dgs-update.component';
import { CategoryGraphqlDgsDeleteDialogComponent } from './delete/category-graphql-dgs-delete-dialog.component';
import { CategoryGraphqlDgsRoutingModule } from './route/category-graphql-dgs-routing.module';

@NgModule({
  imports: [SharedModule, CategoryGraphqlDgsRoutingModule],
  declarations: [
    CategoryGraphqlDgsComponent,
    CategoryGraphqlDgsDetailComponent,
    CategoryGraphqlDgsUpdateComponent,
    CategoryGraphqlDgsDeleteDialogComponent,
  ],
  entryComponents: [CategoryGraphqlDgsDeleteDialogComponent],
})
export class CategoryGraphqlDgsModule {}
