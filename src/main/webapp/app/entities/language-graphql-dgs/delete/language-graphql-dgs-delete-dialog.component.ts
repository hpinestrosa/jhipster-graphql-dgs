import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ILanguageGraphqlDgs } from '../language-graphql-dgs.model';
import { LanguageGraphqlDgsService } from '../service/language-graphql-dgs.service';

@Component({
  templateUrl: './language-graphql-dgs-delete-dialog.component.html',
})
export class LanguageGraphqlDgsDeleteDialogComponent {
  language?: ILanguageGraphqlDgs;

  constructor(protected languageService: LanguageGraphqlDgsService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.languageService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
