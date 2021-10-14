import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IRegionGraphqlDgs } from '../region-graphql-dgs.model';
import { RegionGraphqlDgsService } from '../service/region-graphql-dgs.service';

@Component({
  templateUrl: './region-graphql-dgs-delete-dialog.component.html',
})
export class RegionGraphqlDgsDeleteDialogComponent {
  region?: IRegionGraphqlDgs;

  constructor(protected regionService: RegionGraphqlDgsService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.regionService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
