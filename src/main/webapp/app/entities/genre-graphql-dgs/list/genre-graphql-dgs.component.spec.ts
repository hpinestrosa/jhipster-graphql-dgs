import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { GenreGraphqlDgsService } from '../service/genre-graphql-dgs.service';

import { GenreGraphqlDgsComponent } from './genre-graphql-dgs.component';

describe('Component Tests', () => {
  describe('GenreGraphqlDgs Management Component', () => {
    let comp: GenreGraphqlDgsComponent;
    let fixture: ComponentFixture<GenreGraphqlDgsComponent>;
    let service: GenreGraphqlDgsService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [GenreGraphqlDgsComponent],
      })
        .overrideTemplate(GenreGraphqlDgsComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(GenreGraphqlDgsComponent);
      comp = fixture.componentInstance;
      service = TestBed.inject(GenreGraphqlDgsService);

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
      expect(comp.genres?.[0]).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
