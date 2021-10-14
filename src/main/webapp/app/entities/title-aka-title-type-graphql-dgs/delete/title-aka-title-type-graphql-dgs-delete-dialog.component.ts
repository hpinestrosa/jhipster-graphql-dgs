import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ITitleAkaTitleTypeGraphqlDgs } from '../title-aka-title-type-graphql-dgs.model';
import { TitleAkaTitleTypeGraphqlDgsService } from '../service/title-aka-title-type-graphql-dgs.service';

@Component({
  templateUrl: './title-aka-title-type-graphql-dgs-delete-dialog.component.html',
})
export class TitleAkaTitleTypeGraphqlDgsDeleteDialogComponent {
  titleAkaTitleType?: ITitleAkaTitleTypeGraphqlDgs;

  constructor(protected titleAkaTitleTypeService: TitleAkaTitleTypeGraphqlDgsService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.titleAkaTitleTypeService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
