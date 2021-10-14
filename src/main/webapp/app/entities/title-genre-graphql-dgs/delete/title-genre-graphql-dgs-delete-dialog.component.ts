import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ITitleGenreGraphqlDgs } from '../title-genre-graphql-dgs.model';
import { TitleGenreGraphqlDgsService } from '../service/title-genre-graphql-dgs.service';

@Component({
  templateUrl: './title-genre-graphql-dgs-delete-dialog.component.html',
})
export class TitleGenreGraphqlDgsDeleteDialogComponent {
  titleGenre?: ITitleGenreGraphqlDgs;

  constructor(protected titleGenreService: TitleGenreGraphqlDgsService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.titleGenreService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
