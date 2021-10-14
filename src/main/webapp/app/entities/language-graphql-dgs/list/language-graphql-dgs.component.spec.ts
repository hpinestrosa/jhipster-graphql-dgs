import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { LanguageGraphqlDgsService } from '../service/language-graphql-dgs.service';

import { LanguageGraphqlDgsComponent } from './language-graphql-dgs.component';

describe('Component Tests', () => {
  describe('LanguageGraphqlDgs Management Component', () => {
    let comp: LanguageGraphqlDgsComponent;
    let fixture: ComponentFixture<LanguageGraphqlDgsComponent>;
    let service: LanguageGraphqlDgsService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [LanguageGraphqlDgsComponent],
      })
        .overrideTemplate(LanguageGraphqlDgsComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(LanguageGraphqlDgsComponent);
      comp = fixture.componentInstance;
      service = TestBed.inject(LanguageGraphqlDgsService);

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
      expect(comp.languages?.[0]).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
