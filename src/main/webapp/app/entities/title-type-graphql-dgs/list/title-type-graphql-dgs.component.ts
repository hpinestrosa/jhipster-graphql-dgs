import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ITitleTypeGraphqlDgs } from '../title-type-graphql-dgs.model';
import { TitleTypeGraphqlDgsService } from '../service/title-type-graphql-dgs.service';
import { TitleTypeGraphqlDgsDeleteDialogComponent } from '../delete/title-type-graphql-dgs-delete-dialog.component';

@Component({
  selector: 'jhi-title-type-graphql-dgs',
  templateUrl: './title-type-graphql-dgs.component.html',
})
export class TitleTypeGraphqlDgsComponent implements OnInit {
  titleTypes?: ITitleTypeGraphqlDgs[];
  isLoading = false;

  constructor(protected titleTypeService: TitleTypeGraphqlDgsService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.titleTypeService.query().subscribe(
      (res: HttpResponse<ITitleTypeGraphqlDgs[]>) => {
        this.isLoading = false;
        this.titleTypes = res.body ?? [];
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(index: number, item: ITitleTypeGraphqlDgs): number {
    return item.id!;
  }

  delete(titleType: ITitleTypeGraphqlDgs): void {
    const modalRef = this.modalService.open(TitleTypeGraphqlDgsDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.titleType = titleType;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
