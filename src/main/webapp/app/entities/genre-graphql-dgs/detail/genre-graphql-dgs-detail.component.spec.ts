import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GenreGraphqlDgsDetailComponent } from './genre-graphql-dgs-detail.component';

describe('Component Tests', () => {
  describe('GenreGraphqlDgs Management Detail Component', () => {
    let comp: GenreGraphqlDgsDetailComponent;
    let fixture: ComponentFixture<GenreGraphqlDgsDetailComponent>;

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [GenreGraphqlDgsDetailComponent],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: { data: of({ genre: { id: 123 } }) },
          },
        ],
      })
        .overrideTemplate(GenreGraphqlDgsDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(GenreGraphqlDgsDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load genre on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.genre).toEqual(expect.objectContaining({ id: 123 }));
      });
    });
  });
});
