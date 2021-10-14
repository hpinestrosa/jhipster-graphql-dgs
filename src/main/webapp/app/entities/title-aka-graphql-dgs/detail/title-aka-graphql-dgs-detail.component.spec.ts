import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TitleAkaGraphqlDgsDetailComponent } from './title-aka-graphql-dgs-detail.component';

describe('Component Tests', () => {
  describe('TitleAkaGraphqlDgs Management Detail Component', () => {
    let comp: TitleAkaGraphqlDgsDetailComponent;
    let fixture: ComponentFixture<TitleAkaGraphqlDgsDetailComponent>;

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [TitleAkaGraphqlDgsDetailComponent],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: { data: of({ titleAka: { id: 123 } }) },
          },
        ],
      })
        .overrideTemplate(TitleAkaGraphqlDgsDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(TitleAkaGraphqlDgsDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load titleAka on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.titleAka).toEqual(expect.objectContaining({ id: 123 }));
      });
    });
  });
});
