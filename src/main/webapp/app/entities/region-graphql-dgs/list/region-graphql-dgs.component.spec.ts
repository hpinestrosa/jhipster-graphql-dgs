import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { RegionGraphqlDgsService } from '../service/region-graphql-dgs.service';

import { RegionGraphqlDgsComponent } from './region-graphql-dgs.component';

describe('Component Tests', () => {
  describe('RegionGraphqlDgs Management Component', () => {
    let comp: RegionGraphqlDgsComponent;
    let fixture: ComponentFixture<RegionGraphqlDgsComponent>;
    let service: RegionGraphqlDgsService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [RegionGraphqlDgsComponent],
      })
        .overrideTemplate(RegionGraphqlDgsComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(RegionGraphqlDgsComponent);
      comp = fixture.componentInstance;
      service = TestBed.inject(RegionGraphqlDgsService);

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
      expect(comp.regions?.[0]).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
