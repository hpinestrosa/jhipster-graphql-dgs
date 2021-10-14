import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ITitleAkaTitleTypeGraphqlDgs } from '../title-aka-title-type-graphql-dgs.model';
import { TitleAkaTitleTypeGraphqlDgsService } from '../service/title-aka-title-type-graphql-dgs.service';
import { TitleAkaTitleTypeGraphqlDgsDeleteDialogComponent } from '../delete/title-aka-title-type-graphql-dgs-delete-dialog.component';

@Component({
  selector: 'jhi-title-aka-title-type-graphql-dgs',
  templateUrl: './title-aka-title-type-graphql-dgs.component.html',
})
export class TitleAkaTitleTypeGraphqlDgsComponent implements OnInit {
  titleAkaTitleTypes?: ITitleAkaTitleTypeGraphqlDgs[];
  isLoading = false;

  constructor(protected titleAkaTitleTypeService: TitleAkaTitleTypeGraphqlDgsService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.titleAkaTitleTypeService.query().subscribe(
      (res: HttpResponse<ITitleAkaTitleTypeGraphqlDgs[]>) => {
        this.isLoading = false;
        this.titleAkaTitleTypes = res.body ?? [];
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(index: number, item: ITitleAkaTitleTypeGraphqlDgs): number {
    return item.id!;
  }

  delete(titleAkaTitleType: ITitleAkaTitleTypeGraphqlDgs): void {
    const modalRef = this.modalService.open(TitleAkaTitleTypeGraphqlDgsDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.titleAkaTitleType = titleAkaTitleType;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
