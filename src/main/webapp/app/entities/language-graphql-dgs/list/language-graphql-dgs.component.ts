import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ILanguageGraphqlDgs } from '../language-graphql-dgs.model';
import { LanguageGraphqlDgsService } from '../service/language-graphql-dgs.service';
import { LanguageGraphqlDgsDeleteDialogComponent } from '../delete/language-graphql-dgs-delete-dialog.component';

@Component({
  selector: 'jhi-language-graphql-dgs',
  templateUrl: './language-graphql-dgs.component.html',
})
export class LanguageGraphqlDgsComponent implements OnInit {
  languages?: ILanguageGraphqlDgs[];
  isLoading = false;

  constructor(protected languageService: LanguageGraphqlDgsService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.languageService.query().subscribe(
      (res: HttpResponse<ILanguageGraphqlDgs[]>) => {
        this.isLoading = false;
        this.languages = res.body ?? [];
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(index: number, item: ILanguageGraphqlDgs): number {
    return item.id!;
  }

  delete(language: ILanguageGraphqlDgs): void {
    const modalRef = this.modalService.open(LanguageGraphqlDgsDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.language = language;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
