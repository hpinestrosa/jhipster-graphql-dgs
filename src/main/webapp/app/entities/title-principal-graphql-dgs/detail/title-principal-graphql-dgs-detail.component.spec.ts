import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TitlePrincipalGraphqlDgsDetailComponent } from './title-principal-graphql-dgs-detail.component';

describe('Component Tests', () => {
  describe('TitlePrincipalGraphqlDgs Management Detail Component', () => {
    let comp: TitlePrincipalGraphqlDgsDetailComponent;
    let fixture: ComponentFixture<TitlePrincipalGraphqlDgsDetailComponent>;

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [TitlePrincipalGraphqlDgsDetailComponent],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: { data: of({ titlePrincipal: { id: 123 } }) },
          },
        ],
      })
        .overrideTemplate(TitlePrincipalGraphqlDgsDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(TitlePrincipalGraphqlDgsDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load titlePrincipal on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.titlePrincipal).toEqual(expect.objectContaining({ id: 123 }));
      });
    });
  });
});
