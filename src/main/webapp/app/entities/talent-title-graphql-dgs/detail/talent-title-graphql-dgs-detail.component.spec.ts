import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TalentTitleGraphqlDgsDetailComponent } from './talent-title-graphql-dgs-detail.component';

describe('Component Tests', () => {
  describe('TalentTitleGraphqlDgs Management Detail Component', () => {
    let comp: TalentTitleGraphqlDgsDetailComponent;
    let fixture: ComponentFixture<TalentTitleGraphqlDgsDetailComponent>;

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [TalentTitleGraphqlDgsDetailComponent],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: { data: of({ talentTitle: { id: 123 } }) },
          },
        ],
      })
        .overrideTemplate(TalentTitleGraphqlDgsDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(TalentTitleGraphqlDgsDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load talentTitle on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.talentTitle).toEqual(expect.objectContaining({ id: 123 }));
      });
    });
  });
});
