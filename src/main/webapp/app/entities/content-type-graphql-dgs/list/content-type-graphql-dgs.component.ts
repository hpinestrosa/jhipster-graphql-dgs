import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IContentTypeGraphqlDgs } from '../content-type-graphql-dgs.model';
import { ContentTypeGraphqlDgsService } from '../service/content-type-graphql-dgs.service';
import { ContentTypeGraphqlDgsDeleteDialogComponent } from '../delete/content-type-graphql-dgs-delete-dialog.component';

@Component({
  selector: 'jhi-content-type-graphql-dgs',
  templateUrl: './content-type-graphql-dgs.component.html',
})
export class ContentTypeGraphqlDgsComponent implements OnInit {
  contentTypes?: IContentTypeGraphqlDgs[];
  isLoading = false;

  constructor(protected contentTypeService: ContentTypeGraphqlDgsService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.contentTypeService.query().subscribe(
      (res: HttpResponse<IContentTypeGraphqlDgs[]>) => {
        this.isLoading = false;
        this.contentTypes = res.body ?? [];
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(index: number, item: IContentTypeGraphqlDgs): number {
    return item.id!;
  }

  delete(contentType: IContentTypeGraphqlDgs): void {
    const modalRef = this.modalService.open(ContentTypeGraphqlDgsDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.contentType = contentType;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
