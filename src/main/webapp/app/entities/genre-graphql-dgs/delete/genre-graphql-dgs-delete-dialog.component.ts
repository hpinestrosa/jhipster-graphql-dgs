import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IGenreGraphqlDgs } from '../genre-graphql-dgs.model';
import { GenreGraphqlDgsService } from '../service/genre-graphql-dgs.service';

@Component({
  templateUrl: './genre-graphql-dgs-delete-dialog.component.html',
})
export class GenreGraphqlDgsDeleteDialogComponent {
  genre?: IGenreGraphqlDgs;

  constructor(protected genreService: GenreGraphqlDgsService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.genreService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
