import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ITalentTitleGraphqlDgs } from '../talent-title-graphql-dgs.model';
import { TalentTitleGraphqlDgsService } from '../service/talent-title-graphql-dgs.service';
import { TalentTitleGraphqlDgsDeleteDialogComponent } from '../delete/talent-title-graphql-dgs-delete-dialog.component';

@Component({
  selector: 'jhi-talent-title-graphql-dgs',
  templateUrl: './talent-title-graphql-dgs.component.html',
})
export class TalentTitleGraphqlDgsComponent implements OnInit {
  talentTitles?: ITalentTitleGraphqlDgs[];
  isLoading = false;

  constructor(protected talentTitleService: TalentTitleGraphqlDgsService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.talentTitleService.query().subscribe(
      (res: HttpResponse<ITalentTitleGraphqlDgs[]>) => {
        this.isLoading = false;
        this.talentTitles = res.body ?? [];
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(index: number, item: ITalentTitleGraphqlDgs): number {
    return item.id!;
  }

  delete(talentTitle: ITalentTitleGraphqlDgs): void {
    const modalRef = this.modalService.open(TalentTitleGraphqlDgsDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.talentTitle = talentTitle;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
