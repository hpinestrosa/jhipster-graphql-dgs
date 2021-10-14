import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ITitleAkaGraphqlDgs } from '../title-aka-graphql-dgs.model';
import { TitleAkaGraphqlDgsService } from '../service/title-aka-graphql-dgs.service';
import { TitleAkaGraphqlDgsDeleteDialogComponent } from '../delete/title-aka-graphql-dgs-delete-dialog.component';

@Component({
  selector: 'jhi-title-aka-graphql-dgs',
  templateUrl: './title-aka-graphql-dgs.component.html',
})
export class TitleAkaGraphqlDgsComponent implements OnInit {
  titleAkas?: ITitleAkaGraphqlDgs[];
  isLoading = false;

  constructor(protected titleAkaService: TitleAkaGraphqlDgsService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.titleAkaService.query().subscribe(
      (res: HttpResponse<ITitleAkaGraphqlDgs[]>) => {
        this.isLoading = false;
        this.titleAkas = res.body ?? [];
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(index: number, item: ITitleAkaGraphqlDgs): number {
    return item.id!;
  }

  delete(titleAka: ITitleAkaGraphqlDgs): void {
    const modalRef = this.modalService.open(TitleAkaGraphqlDgsDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.titleAka = titleAka;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
