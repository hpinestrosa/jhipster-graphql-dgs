import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TitleTypeGraphqlDgsDetailComponent } from './title-type-graphql-dgs-detail.component';

describe('Component Tests', () => {
  describe('TitleTypeGraphqlDgs Management Detail Component', () => {
    let comp: TitleTypeGraphqlDgsDetailComponent;
    let fixture: ComponentFixture<TitleTypeGraphqlDgsDetailComponent>;

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [TitleTypeGraphqlDgsDetailComponent],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: { data: of({ titleType: { id: 123 } }) },
          },
        ],
      })
        .overrideTemplate(TitleTypeGraphqlDgsDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(TitleTypeGraphqlDgsDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load titleType on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.titleType).toEqual(expect.objectContaining({ id: 123 }));
      });
    });
  });
});
