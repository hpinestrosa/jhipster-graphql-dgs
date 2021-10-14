jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { TitleEpisodeGraphqlDgsService } from '../service/title-episode-graphql-dgs.service';
import { ITitleEpisodeGraphqlDgs, TitleEpisodeGraphqlDgs } from '../title-episode-graphql-dgs.model';

import { TitleEpisodeGraphqlDgsUpdateComponent } from './title-episode-graphql-dgs-update.component';

describe('Component Tests', () => {
  describe('TitleEpisodeGraphqlDgs Management Update Component', () => {
    let comp: TitleEpisodeGraphqlDgsUpdateComponent;
    let fixture: ComponentFixture<TitleEpisodeGraphqlDgsUpdateComponent>;
    let activatedRoute: ActivatedRoute;
    let titleEpisodeService: TitleEpisodeGraphqlDgsService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [TitleEpisodeGraphqlDgsUpdateComponent],
        providers: [FormBuilder, ActivatedRoute],
      })
        .overrideTemplate(TitleEpisodeGraphqlDgsUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(TitleEpisodeGraphqlDgsUpdateComponent);
      activatedRoute = TestBed.inject(ActivatedRoute);
      titleEpisodeService = TestBed.inject(TitleEpisodeGraphqlDgsService);

      comp = fixture.componentInstance;
    });

    describe('ngOnInit', () => {
      it('Should update editForm', () => {
        const titleEpisode: ITitleEpisodeGraphqlDgs = { id: 456 };

        activatedRoute.data = of({ titleEpisode });
        comp.ngOnInit();

        expect(comp.editForm.value).toEqual(expect.objectContaining(titleEpisode));
      });
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<TitleEpisodeGraphqlDgs>>();
        const titleEpisode = { id: 123 };
        jest.spyOn(titleEpisodeService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ titleEpisode });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: titleEpisode }));
        saveSubject.complete();

        // THEN
        expect(comp.previousState).toHaveBeenCalled();
        expect(titleEpisodeService.update).toHaveBeenCalledWith(titleEpisode);
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<TitleEpisodeGraphqlDgs>>();
        const titleEpisode = new TitleEpisodeGraphqlDgs();
        jest.spyOn(titleEpisodeService, 'create').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ titleEpisode });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: titleEpisode }));
        saveSubject.complete();

        // THEN
        expect(titleEpisodeService.create).toHaveBeenCalledWith(titleEpisode);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).toHaveBeenCalled();
      });

      it('Should set isSaving to false on error', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<TitleEpisodeGraphqlDgs>>();
        const titleEpisode = { id: 123 };
        jest.spyOn(titleEpisodeService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ titleEpisode });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.error('This is an error!');

        // THEN
        expect(titleEpisodeService.update).toHaveBeenCalledWith(titleEpisode);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).not.toHaveBeenCalled();
      });
    });
  });
});
