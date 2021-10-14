import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { LanguageGraphqlDgsDetailComponent } from './language-graphql-dgs-detail.component';

describe('Component Tests', () => {
  describe('LanguageGraphqlDgs Management Detail Component', () => {
    let comp: LanguageGraphqlDgsDetailComponent;
    let fixture: ComponentFixture<LanguageGraphqlDgsDetailComponent>;

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [LanguageGraphqlDgsDetailComponent],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: { data: of({ language: { id: 123 } }) },
          },
        ],
      })
        .overrideTemplate(LanguageGraphqlDgsDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(LanguageGraphqlDgsDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load language on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.language).toEqual(expect.objectContaining({ id: 123 }));
      });
    });
  });
});
