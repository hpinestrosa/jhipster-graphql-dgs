import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ITitleGraphqlDgs } from '../title-graphql-dgs.model';
import { TitleGraphqlDgsService } from '../service/title-graphql-dgs.service';

@Component({
  templateUrl: './title-graphql-dgs-delete-dialog.component.html',
})
export class TitleGraphqlDgsDeleteDialogComponent {
  title?: ITitleGraphqlDgs;

  constructor(protected titleService: TitleGraphqlDgsService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.titleService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
