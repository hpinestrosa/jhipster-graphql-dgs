import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TitleGraphqlDgsDetailComponent } from './title-graphql-dgs-detail.component';

describe('Component Tests', () => {
  describe('TitleGraphqlDgs Management Detail Component', () => {
    let comp: TitleGraphqlDgsDetailComponent;
    let fixture: ComponentFixture<TitleGraphqlDgsDetailComponent>;

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [TitleGraphqlDgsDetailComponent],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: { data: of({ title: { id: 123 } }) },
          },
        ],
      })
        .overrideTemplate(TitleGraphqlDgsDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(TitleGraphqlDgsDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load title on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.title).toEqual(expect.objectContaining({ id: 123 }));
      });
    });
  });
});
