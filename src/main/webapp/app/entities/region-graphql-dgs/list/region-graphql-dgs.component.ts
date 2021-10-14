import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IRegionGraphqlDgs } from '../region-graphql-dgs.model';
import { RegionGraphqlDgsService } from '../service/region-graphql-dgs.service';
import { RegionGraphqlDgsDeleteDialogComponent } from '../delete/region-graphql-dgs-delete-dialog.component';

@Component({
  selector: 'jhi-region-graphql-dgs',
  templateUrl: './region-graphql-dgs.component.html',
})
export class RegionGraphqlDgsComponent implements OnInit {
  regions?: IRegionGraphqlDgs[];
  isLoading = false;

  constructor(protected regionService: RegionGraphqlDgsService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.regionService.query().subscribe(
      (res: HttpResponse<IRegionGraphqlDgs[]>) => {
        this.isLoading = false;
        this.regions = res.body ?? [];
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(index: number, item: IRegionGraphqlDgs): number {
    return item.id!;
  }

  delete(region: IRegionGraphqlDgs): void {
    const modalRef = this.modalService.open(RegionGraphqlDgsDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.region = region;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
