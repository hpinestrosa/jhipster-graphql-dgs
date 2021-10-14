import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { TitleGenreGraphqlDgsService } from '../service/title-genre-graphql-dgs.service';

import { TitleGenreGraphqlDgsComponent } from './title-genre-graphql-dgs.component';

describe('Component Tests', () => {
  describe('TitleGenreGraphqlDgs Management Component', () => {
    let comp: TitleGenreGraphqlDgsComponent;
    let fixture: ComponentFixture<TitleGenreGraphqlDgsComponent>;
    let service: TitleGenreGraphqlDgsService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [TitleGenreGraphqlDgsComponent],
      })
        .overrideTemplate(TitleGenreGraphqlDgsComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(TitleGenreGraphqlDgsComponent);
      comp = fixture.componentInstance;
      service = TestBed.inject(TitleGenreGraphqlDgsService);

      const headers = new HttpHeaders().append('link', 'link;link');
      jest.spyOn(service, 'query').mockReturnValue(
        of(
          new HttpResponse({
            body: [{ id: 123 }],
            headers,
          })
        )
      );
    });

    it('Should call load all on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.titleGenres?.[0]).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
