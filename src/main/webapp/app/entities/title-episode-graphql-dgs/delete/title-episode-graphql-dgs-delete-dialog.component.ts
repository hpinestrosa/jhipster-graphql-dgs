import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ITitleEpisodeGraphqlDgs } from '../title-episode-graphql-dgs.model';
import { TitleEpisodeGraphqlDgsService } from '../service/title-episode-graphql-dgs.service';

@Component({
  templateUrl: './title-episode-graphql-dgs-delete-dialog.component.html',
})
export class TitleEpisodeGraphqlDgsDeleteDialogComponent {
  titleEpisode?: ITitleEpisodeGraphqlDgs;

  constructor(protected titleEpisodeService: TitleEpisodeGraphqlDgsService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.titleEpisodeService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
