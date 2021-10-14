import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { RegionGraphqlDgsComponent } from './list/region-graphql-dgs.component';
import { RegionGraphqlDgsDetailComponent } from './detail/region-graphql-dgs-detail.component';
import { RegionGraphqlDgsUpdateComponent } from './update/region-graphql-dgs-update.component';
import { RegionGraphqlDgsDeleteDialogComponent } from './delete/region-graphql-dgs-delete-dialog.component';
import { RegionGraphqlDgsRoutingModule } from './route/region-graphql-dgs-routing.module';

@NgModule({
  imports: [SharedModule, RegionGraphqlDgsRoutingModule],
  declarations: [
    RegionGraphqlDgsComponent,
    RegionGraphqlDgsDetailComponent,
    RegionGraphqlDgsUpdateComponent,
    RegionGraphqlDgsDeleteDialogComponent,
  ],
  entryComponents: [RegionGraphqlDgsDeleteDialogComponent],
})
export class RegionGraphqlDgsModule {}
