import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ITitlePrincipalGraphqlDgs } from '../title-principal-graphql-dgs.model';
import { TitlePrincipalGraphqlDgsService } from '../service/title-principal-graphql-dgs.service';
import { TitlePrincipalGraphqlDgsDeleteDialogComponent } from '../delete/title-principal-graphql-dgs-delete-dialog.component';

@Component({
  selector: 'jhi-title-principal-graphql-dgs',
  templateUrl: './title-principal-graphql-dgs.component.html',
})
export class TitlePrincipalGraphqlDgsComponent implements OnInit {
  titlePrincipals?: ITitlePrincipalGraphqlDgs[];
  isLoading = false;

  constructor(protected titlePrincipalService: TitlePrincipalGraphqlDgsService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.titlePrincipalService.query().subscribe(
      (res: HttpResponse<ITitlePrincipalGraphqlDgs[]>) => {
        this.isLoading = false;
        this.titlePrincipals = res.body ?? [];
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(index: number, item: ITitlePrincipalGraphqlDgs): number {
    return item.id!;
  }

  delete(titlePrincipal: ITitlePrincipalGraphqlDgs): void {
    const modalRef = this.modalService.open(TitlePrincipalGraphqlDgsDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.titlePrincipal = titlePrincipal;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
