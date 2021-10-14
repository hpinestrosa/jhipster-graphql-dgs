import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ITalentRoleGraphqlDgs } from '../talent-role-graphql-dgs.model';
import { TalentRoleGraphqlDgsService } from '../service/talent-role-graphql-dgs.service';
import { TalentRoleGraphqlDgsDeleteDialogComponent } from '../delete/talent-role-graphql-dgs-delete-dialog.component';

@Component({
  selector: 'jhi-talent-role-graphql-dgs',
  templateUrl: './talent-role-graphql-dgs.component.html',
})
export class TalentRoleGraphqlDgsComponent implements OnInit {
  talentRoles?: ITalentRoleGraphqlDgs[];
  isLoading = false;

  constructor(protected talentRoleService: TalentRoleGraphqlDgsService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.talentRoleService.query().subscribe(
      (res: HttpResponse<ITalentRoleGraphqlDgs[]>) => {
        this.isLoading = false;
        this.talentRoles = res.body ?? [];
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(index: number, item: ITalentRoleGraphqlDgs): number {
    return item.id!;
  }

  delete(talentRole: ITalentRoleGraphqlDgs): void {
    const modalRef = this.modalService.open(TalentRoleGraphqlDgsDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.talentRole = talentRole;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
