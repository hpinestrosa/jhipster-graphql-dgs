import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { RegionGraphqlDgsDetailComponent } from './region-graphql-dgs-detail.component';

describe('Component Tests', () => {
  describe('RegionGraphqlDgs Management Detail Component', () => {
    let comp: RegionGraphqlDgsDetailComponent;
    let fixture: ComponentFixture<RegionGraphqlDgsDetailComponent>;

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [RegionGraphqlDgsDetailComponent],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: { data: of({ region: { id: 123 } }) },
          },
        ],
      })
        .overrideTemplate(RegionGraphqlDgsDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(RegionGraphqlDgsDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load region on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.region).toEqual(expect.objectContaining({ id: 123 }));
      });
    });
  });
});
