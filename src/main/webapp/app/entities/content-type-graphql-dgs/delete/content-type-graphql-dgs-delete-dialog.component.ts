import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IContentTypeGraphqlDgs } from '../content-type-graphql-dgs.model';
import { ContentTypeGraphqlDgsService } from '../service/content-type-graphql-dgs.service';

@Component({
  templateUrl: './content-type-graphql-dgs-delete-dialog.component.html',
})
export class ContentTypeGraphqlDgsDeleteDialogComponent {
  contentType?: IContentTypeGraphqlDgs;

  constructor(protected contentTypeService: ContentTypeGraphqlDgsService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.contentTypeService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
