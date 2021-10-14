import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ITitleAkaGraphqlDgs } from '../title-aka-graphql-dgs.model';
import { TitleAkaGraphqlDgsService } from '../service/title-aka-graphql-dgs.service';

@Component({
  templateUrl: './title-aka-graphql-dgs-delete-dialog.component.html',
})
export class TitleAkaGraphqlDgsDeleteDialogComponent {
  titleAka?: ITitleAkaGraphqlDgs;

  constructor(protected titleAkaService: TitleAkaGraphqlDgsService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.titleAkaService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
