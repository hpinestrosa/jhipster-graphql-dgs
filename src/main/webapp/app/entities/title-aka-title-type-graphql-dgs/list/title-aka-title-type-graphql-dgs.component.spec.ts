import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { TitleAkaTitleTypeGraphqlDgsService } from '../service/title-aka-title-type-graphql-dgs.service';

import { TitleAkaTitleTypeGraphqlDgsComponent } from './title-aka-title-type-graphql-dgs.component';

describe('Component Tests', () => {
  describe('TitleAkaTitleTypeGraphqlDgs Management Component', () => {
    let comp: TitleAkaTitleTypeGraphqlDgsComponent;
    let fixture: ComponentFixture<TitleAkaTitleTypeGraphqlDgsComponent>;
    let service: TitleAkaTitleTypeGraphqlDgsService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [TitleAkaTitleTypeGraphqlDgsComponent],
      })
        .overrideTemplate(TitleAkaTitleTypeGraphqlDgsComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(TitleAkaTitleTypeGraphqlDgsComponent);
      comp = fixture.componentInstance;
      service = TestBed.inject(TitleAkaTitleTypeGraphqlDgsService);

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
      expect(comp.titleAkaTitleTypes?.[0]).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
