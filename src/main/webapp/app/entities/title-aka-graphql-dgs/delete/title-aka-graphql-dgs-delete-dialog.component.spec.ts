jest.mock('@ng-bootstrap/ng-bootstrap');

import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { TitleAkaGraphqlDgsService } from '../service/title-aka-graphql-dgs.service';

import { TitleAkaGraphqlDgsDeleteDialogComponent } from './title-aka-graphql-dgs-delete-dialog.component';

describe('Component Tests', () => {
  describe('TitleAkaGraphqlDgs Management Delete Component', () => {
    let comp: TitleAkaGraphqlDgsDeleteDialogComponent;
    let fixture: ComponentFixture<TitleAkaGraphqlDgsDeleteDialogComponent>;
    let service: TitleAkaGraphqlDgsService;
    let mockActiveModal: NgbActiveModal;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [TitleAkaGraphqlDgsDeleteDialogComponent],
        providers: [NgbActiveModal],
      })
        .overrideTemplate(TitleAkaGraphqlDgsDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(TitleAkaGraphqlDgsDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = TestBed.inject(TitleAkaGraphqlDgsService);
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
