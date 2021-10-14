import { Component, OnInit } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ITalentGraphqlDgs } from '../talent-graphql-dgs.model';

import { ASC, DESC, ITEMS_PER_PAGE } from 'app/config/pagination.constants';
import { TalentGraphqlDgsService } from '../service/talent-graphql-dgs.service';
import { TalentGraphqlDgsDeleteDialogComponent } from '../delete/talent-graphql-dgs-delete-dialog.component';
import { ParseLinks } from 'app/core/util/parse-links.service';

@Component({
  selector: 'jhi-talent-graphql-dgs',
  templateUrl: './talent-graphql-dgs.component.html',
})
export class TalentGraphqlDgsComponent implements OnInit {
  talents: ITalentGraphqlDgs[];
  isLoading = false;
  itemsPerPage: number;
  links: { [key: string]: number };
  page: number;
  predicate: string;
  ascending: boolean;

  constructor(protected talentService: TalentGraphqlDgsService, protected modalService: NgbModal, protected parseLinks: ParseLinks) {
    this.talents = [];
    this.itemsPerPage = ITEMS_PER_PAGE;
    this.page = 0;
    this.links = {
      last: 0,
    };
    this.predicate = 'id';
    this.ascending = true;
  }

  loadAll(): void {
    this.isLoading = true;

    this.talentService
      .query({
        page: this.page,
        size: this.itemsPerPage,
        sort: this.sort(),
      })
      .subscribe(
        (res: HttpResponse<ITalentGraphqlDgs[]>) => {
          this.isLoading = false;
          this.paginateTalents(res.body, res.headers);
        },
        () => {
          this.isLoading = false;
        }
      );
  }

  reset(): void {
    this.page = 0;
    this.talents = [];
    this.loadAll();
  }

  loadPage(page: number): void {
    this.page = page;
    this.loadAll();
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(index: number, item: ITalentGraphqlDgs): number {
    return item.id!;
  }

  delete(talent: ITalentGraphqlDgs): void {
    const modalRef = this.modalService.open(TalentGraphqlDgsDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.talent = talent;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.reset();
      }
    });
  }

  protected sort(): string[] {
    const result = [this.predicate + ',' + (this.ascending ? ASC : DESC)];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  protected paginateTalents(data: ITalentGraphqlDgs[] | null, headers: HttpHeaders): void {
    this.links = this.parseLinks.parse(headers.get('link') ?? '');
    if (data) {
      for (const d of data) {
        this.talents.push(d);
      }
    }
  }
}
