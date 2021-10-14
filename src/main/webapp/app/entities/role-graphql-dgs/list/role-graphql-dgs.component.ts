import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IRoleGraphqlDgs } from '../role-graphql-dgs.model';
import { RoleGraphqlDgsService } from '../service/role-graphql-dgs.service';
import { RoleGraphqlDgsDeleteDialogComponent } from '../delete/role-graphql-dgs-delete-dialog.component';

@Component({
  selector: 'jhi-role-graphql-dgs',
  templateUrl: './role-graphql-dgs.component.html',
})
export class RoleGraphqlDgsComponent implements OnInit {
  roles?: IRoleGraphqlDgs[];
  isLoading = false;

  constructor(protected roleService: RoleGraphqlDgsService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.roleService.query().subscribe(
      (res: HttpResponse<IRoleGraphqlDgs[]>) => {
        this.isLoading = false;
        this.roles = res.body ?? [];
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(index: number, item: IRoleGraphqlDgs): number {
    return item.id!;
  }

  delete(role: IRoleGraphqlDgs): void {
    const modalRef = this.modalService.open(RoleGraphqlDgsDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.role = role;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
