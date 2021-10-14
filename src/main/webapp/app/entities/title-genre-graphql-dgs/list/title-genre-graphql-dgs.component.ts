import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ITitleGenreGraphqlDgs } from '../title-genre-graphql-dgs.model';
import { TitleGenreGraphqlDgsService } from '../service/title-genre-graphql-dgs.service';
import { TitleGenreGraphqlDgsDeleteDialogComponent } from '../delete/title-genre-graphql-dgs-delete-dialog.component';

@Component({
  selector: 'jhi-title-genre-graphql-dgs',
  templateUrl: './title-genre-graphql-dgs.component.html',
})
export class TitleGenreGraphqlDgsComponent implements OnInit {
  titleGenres?: ITitleGenreGraphqlDgs[];
  isLoading = false;

  constructor(protected titleGenreService: TitleGenreGraphqlDgsService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.titleGenreService.query().subscribe(
      (res: HttpResponse<ITitleGenreGraphqlDgs[]>) => {
        this.isLoading = false;
        this.titleGenres = res.body ?? [];
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(index: number, item: ITitleGenreGraphqlDgs): number {
    return item.id!;
  }

  delete(titleGenre: ITitleGenreGraphqlDgs): void {
    const modalRef = this.modalService.open(TitleGenreGraphqlDgsDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.titleGenre = titleGenre;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
