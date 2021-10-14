import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { ContentTypeGraphqlDgsService } from '../service/content-type-graphql-dgs.service';

import { ContentTypeGraphqlDgsComponent } from './content-type-graphql-dgs.component';

describe('Component Tests', () => {
  describe('ContentTypeGraphqlDgs Management Component', () => {
    let comp: ContentTypeGraphqlDgsComponent;
    let fixture: ComponentFixture<ContentTypeGraphqlDgsComponent>;
    let service: ContentTypeGraphqlDgsService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [ContentTypeGraphqlDgsComponent],
      })
        .overrideTemplate(ContentTypeGraphqlDgsComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ContentTypeGraphqlDgsComponent);
      comp = fixture.componentInstance;
      service = TestBed.inject(ContentTypeGraphqlDgsService);

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
      expect(comp.contentTypes?.[0]).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
