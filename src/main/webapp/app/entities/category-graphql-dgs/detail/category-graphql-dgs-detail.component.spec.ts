import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { CategoryGraphqlDgsDetailComponent } from './category-graphql-dgs-detail.component';

describe('Component Tests', () => {
  describe('CategoryGraphqlDgs Management Detail Component', () => {
    let comp: CategoryGraphqlDgsDetailComponent;
    let fixture: ComponentFixture<CategoryGraphqlDgsDetailComponent>;

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [CategoryGraphqlDgsDetailComponent],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: { data: of({ category: { id: 123 } }) },
          },
        ],
      })
        .overrideTemplate(CategoryGraphqlDgsDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(CategoryGraphqlDgsDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load category on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.category).toEqual(expect.objectContaining({ id: 123 }));
      });
    });
  });
});
