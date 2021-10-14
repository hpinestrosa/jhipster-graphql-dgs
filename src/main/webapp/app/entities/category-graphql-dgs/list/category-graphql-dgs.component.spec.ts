import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { CategoryGraphqlDgsService } from '../service/category-graphql-dgs.service';

import { CategoryGraphqlDgsComponent } from './category-graphql-dgs.component';

describe('Component Tests', () => {
  describe('CategoryGraphqlDgs Management Component', () => {
    let comp: CategoryGraphqlDgsComponent;
    let fixture: ComponentFixture<CategoryGraphqlDgsComponent>;
    let service: CategoryGraphqlDgsService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [CategoryGraphqlDgsComponent],
      })
        .overrideTemplate(CategoryGraphqlDgsComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(CategoryGraphqlDgsComponent);
      comp = fixture.componentInstance;
      service = TestBed.inject(CategoryGraphqlDgsService);

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
      expect(comp.categories?.[0]).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
