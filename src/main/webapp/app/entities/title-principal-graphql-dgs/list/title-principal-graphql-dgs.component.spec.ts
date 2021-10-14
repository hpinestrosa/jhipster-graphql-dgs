import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { TitlePrincipalGraphqlDgsService } from '../service/title-principal-graphql-dgs.service';

import { TitlePrincipalGraphqlDgsComponent } from './title-principal-graphql-dgs.component';

describe('Component Tests', () => {
  describe('TitlePrincipalGraphqlDgs Management Component', () => {
    let comp: TitlePrincipalGraphqlDgsComponent;
    let fixture: ComponentFixture<TitlePrincipalGraphqlDgsComponent>;
    let service: TitlePrincipalGraphqlDgsService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [TitlePrincipalGraphqlDgsComponent],
      })
        .overrideTemplate(TitlePrincipalGraphqlDgsComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(TitlePrincipalGraphqlDgsComponent);
      comp = fixture.componentInstance;
      service = TestBed.inject(TitlePrincipalGraphqlDgsService);

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
      expect(comp.titlePrincipals?.[0]).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
