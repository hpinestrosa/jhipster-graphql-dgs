import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ITitlePrincipalGraphqlDgs } from '../title-principal-graphql-dgs.model';
import { TitlePrincipalGraphqlDgsService } from '../service/title-principal-graphql-dgs.service';

@Component({
  templateUrl: './title-principal-graphql-dgs-delete-dialog.component.html',
})
export class TitlePrincipalGraphqlDgsDeleteDialogComponent {
  titlePrincipal?: ITitlePrincipalGraphqlDgs;

  constructor(protected titlePrincipalService: TitlePrincipalGraphqlDgsService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.titlePrincipalService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
