import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TalentRoleGraphqlDgsDetailComponent } from './talent-role-graphql-dgs-detail.component';

describe('Component Tests', () => {
  describe('TalentRoleGraphqlDgs Management Detail Component', () => {
    let comp: TalentRoleGraphqlDgsDetailComponent;
    let fixture: ComponentFixture<TalentRoleGraphqlDgsDetailComponent>;

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [TalentRoleGraphqlDgsDetailComponent],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: { data: of({ talentRole: { id: 123 } }) },
          },
        ],
      })
        .overrideTemplate(TalentRoleGraphqlDgsDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(TalentRoleGraphqlDgsDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load talentRole on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.talentRole).toEqual(expect.objectContaining({ id: 123 }));
      });
    });
  });
});
