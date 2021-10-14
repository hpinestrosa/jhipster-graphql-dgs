import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IGenreGraphqlDgs } from '../genre-graphql-dgs.model';
import { GenreGraphqlDgsService } from '../service/genre-graphql-dgs.service';
import { GenreGraphqlDgsDeleteDialogComponent } from '../delete/genre-graphql-dgs-delete-dialog.component';

@Component({
  selector: 'jhi-genre-graphql-dgs',
  templateUrl: './genre-graphql-dgs.component.html',
})
export class GenreGraphqlDgsComponent implements OnInit {
  genres?: IGenreGraphqlDgs[];
  isLoading = false;

  constructor(protected genreService: GenreGraphqlDgsService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.genreService.query().subscribe(
      (res: HttpResponse<IGenreGraphqlDgs[]>) => {
        this.isLoading = false;
        this.genres = res.body ?? [];
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(index: number, item: IGenreGraphqlDgs): number {
    return item.id!;
  }

  delete(genre: IGenreGraphqlDgs): void {
    const modalRef = this.modalService.open(GenreGraphqlDgsDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.genre = genre;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
