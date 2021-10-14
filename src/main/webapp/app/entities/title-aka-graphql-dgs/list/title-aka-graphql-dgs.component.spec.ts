import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { TitleAkaGraphqlDgsService } from '../service/title-aka-graphql-dgs.service';

import { TitleAkaGraphqlDgsComponent } from './title-aka-graphql-dgs.component';

describe('Component Tests', () => {
  describe('TitleAkaGraphqlDgs Management Component', () => {
    let comp: TitleAkaGraphqlDgsComponent;
    let fixture: ComponentFixture<TitleAkaGraphqlDgsComponent>;
    let service: TitleAkaGraphqlDgsService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [TitleAkaGraphqlDgsComponent],
      })
        .overrideTemplate(TitleAkaGraphqlDgsComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(TitleAkaGraphqlDgsComponent);
      comp = fixture.componentInstance;
      service = TestBed.inject(TitleAkaGraphqlDgsService);

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
      expect(comp.titleAkas?.[0]).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
