import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TitleGenreGraphqlDgsDetailComponent } from './title-genre-graphql-dgs-detail.component';

describe('Component Tests', () => {
  describe('TitleGenreGraphqlDgs Management Detail Component', () => {
    let comp: TitleGenreGraphqlDgsDetailComponent;
    let fixture: ComponentFixture<TitleGenreGraphqlDgsDetailComponent>;

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [TitleGenreGraphqlDgsDetailComponent],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: { data: of({ titleGenre: { id: 123 } }) },
          },
        ],
      })
        .overrideTemplate(TitleGenreGraphqlDgsDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(TitleGenreGraphqlDgsDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load titleGenre on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.titleGenre).toEqual(expect.objectContaining({ id: 123 }));
      });
    });
  });
});
