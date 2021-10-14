import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TitleAkaTitleTypeGraphqlDgsDetailComponent } from './title-aka-title-type-graphql-dgs-detail.component';

describe('Component Tests', () => {
  describe('TitleAkaTitleTypeGraphqlDgs Management Detail Component', () => {
    let comp: TitleAkaTitleTypeGraphqlDgsDetailComponent;
    let fixture: ComponentFixture<TitleAkaTitleTypeGraphqlDgsDetailComponent>;

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [TitleAkaTitleTypeGraphqlDgsDetailComponent],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: { data: of({ titleAkaTitleType: { id: 123 } }) },
          },
        ],
      })
        .overrideTemplate(TitleAkaTitleTypeGraphqlDgsDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(TitleAkaTitleTypeGraphqlDgsDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load titleAkaTitleType on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.titleAkaTitleType).toEqual(expect.objectContaining({ id: 123 }));
      });
    });
  });
});
