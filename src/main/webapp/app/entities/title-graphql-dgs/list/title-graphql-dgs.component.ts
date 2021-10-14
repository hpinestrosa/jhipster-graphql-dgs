import { Component, OnInit } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ITitleGraphqlDgs } from '../title-graphql-dgs.model';

import { ASC, DESC, ITEMS_PER_PAGE } from 'app/config/pagination.constants';
import { TitleGraphqlDgsService } from '../service/title-graphql-dgs.service';
import { TitleGraphqlDgsDeleteDialogComponent } from '../delete/title-graphql-dgs-delete-dialog.component';
import { ParseLinks } from 'app/core/util/parse-links.service';

@Component({
  selector: 'jhi-title-graphql-dgs',
  templateUrl: './title-graphql-dgs.component.html',
})
export class TitleGraphqlDgsComponent implements OnInit {
  titles: ITitleGraphqlDgs[];
  isLoading = false;
  itemsPerPage: number;
  links: { [key: string]: number };
  page: number;
  predicate: string;
  ascending: boolean;

  constructor(protected titleService: TitleGraphqlDgsService, protected modalService: NgbModal, protected parseLinks: ParseLinks) {
    this.titles = [];
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

    this.titleService
      .query({
        page: this.page,
        size: this.itemsPerPage,
        sort: this.sort(),
      })
      .subscribe(
        (res: HttpResponse<ITitleGraphqlDgs[]>) => {
          this.isLoading = false;
          this.paginateTitles(res.body, res.headers);
        },
        () => {
          this.isLoading = false;
        }
      );
  }

  reset(): void {
    this.page = 0;
    this.titles = [];
    this.loadAll();
  }

  loadPage(page: number): void {
    this.page = page;
    this.loadAll();
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(index: number, item: ITitleGraphqlDgs): number {
    return item.id!;
  }

  delete(title: ITitleGraphqlDgs): void {
    const modalRef = this.modalService.open(TitleGraphqlDgsDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.title = title;
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

  protected paginateTitles(data: ITitleGraphqlDgs[] | null, headers: HttpHeaders): void {
    this.links = this.parseLinks.parse(headers.get('link') ?? '');
    if (data) {
      for (const d of data) {
        this.titles.push(d);
      }
    }
  }
}
