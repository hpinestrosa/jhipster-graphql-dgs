jest.mock('@ng-bootstrap/ng-bootstrap');

import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { TitlePrincipalGraphqlDgsService } from '../service/title-principal-graphql-dgs.service';

import { TitlePrincipalGraphqlDgsDeleteDialogComponent } from './title-principal-graphql-dgs-delete-dialog.component';

describe('Component Tests', () => {
  describe('TitlePrincipalGraphqlDgs Management Delete Component', () => {
    let comp: TitlePrincipalGraphqlDgsDeleteDialogComponent;
    let fixture: ComponentFixture<TitlePrincipalGraphqlDgsDeleteDialogComponent>;
    let service: TitlePrincipalGraphqlDgsService;
    let mockActiveModal: NgbActiveModal;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [TitlePrincipalGraphqlDgsDeleteDialogComponent],
        providers: [NgbActiveModal],
      })
        .overrideTemplate(TitlePrincipalGraphqlDgsDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(TitlePrincipalGraphqlDgsDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = TestBed.inject(TitlePrincipalGraphqlDgsService);
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
