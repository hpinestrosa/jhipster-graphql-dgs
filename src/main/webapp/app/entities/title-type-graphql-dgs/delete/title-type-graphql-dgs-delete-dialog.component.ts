import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ITitleTypeGraphqlDgs } from '../title-type-graphql-dgs.model';
import { TitleTypeGraphqlDgsService } from '../service/title-type-graphql-dgs.service';

@Component({
  templateUrl: './title-type-graphql-dgs-delete-dialog.component.html',
})
export class TitleTypeGraphqlDgsDeleteDialogComponent {
  titleType?: ITitleTypeGraphqlDgs;

  constructor(protected titleTypeService: TitleTypeGraphqlDgsService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.titleTypeService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
