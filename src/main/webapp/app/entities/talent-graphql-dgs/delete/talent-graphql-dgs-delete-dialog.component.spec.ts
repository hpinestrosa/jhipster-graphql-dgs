jest.mock('@ng-bootstrap/ng-bootstrap');

import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { TalentGraphqlDgsService } from '../service/talent-graphql-dgs.service';

import { TalentGraphqlDgsDeleteDialogComponent } from './talent-graphql-dgs-delete-dialog.component';

describe('Component Tests', () => {
  describe('TalentGraphqlDgs Management Delete Component', () => {
    let comp: TalentGraphqlDgsDeleteDialogComponent;
    let fixture: ComponentFixture<TalentGraphqlDgsDeleteDialogComponent>;
    let service: TalentGraphqlDgsService;
    let mockActiveModal: NgbActiveModal;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [TalentGraphqlDgsDeleteDialogComponent],
        providers: [NgbActiveModal],
      })
        .overrideTemplate(TalentGraphqlDgsDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(TalentGraphqlDgsDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = TestBed.inject(TalentGraphqlDgsService);
      mockActiveModal = TestBed.inject(NgbActiveModal);
    });

    describe('confirmDelete', () => {
      it('Should call delete service on confirmDelete', inject(
        [],
        fakeAsync(() => {
          // GIVEN
          jest.spyOn(service, 'delete').mockReturnValue(of(new HttpResponse({})));

          // WHEN
          comp.confirmDelete(123);
          tick();

          // THEN
          expect(service.delete).toHaveBeenCalledWith(123);
          expect(mockActiveModal.close).toHaveBeenCalledWith('deleted');
        })
      ));

      it('Should not call delete service on clear', () => {
        // GIVEN
        jest.spyOn(service, 'delete');

        // WHEN
        comp.cancel();

        // THEN
        expect(service.delete).not.toHaveBeenCalled();
        expect(mockActiveModal.close).not.toHaveBeenCalled();
        expect(mockActiveModal.dismiss).toHaveBeenCalled();
      });
    });
  });
});
