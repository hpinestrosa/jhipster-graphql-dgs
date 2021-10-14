import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TalentGraphqlDgsDetailComponent } from './talent-graphql-dgs-detail.component';

describe('Component Tests', () => {
  describe('TalentGraphqlDgs Management Detail Component', () => {
    let comp: TalentGraphqlDgsDetailComponent;
    let fixture: ComponentFixture<TalentGraphqlDgsDetailComponent>;

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [TalentGraphqlDgsDetailComponent],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: { data: of({ talent: { id: 123 } }) },
          },
        ],
      })
        .overrideTemplate(TalentGraphqlDgsDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(TalentGraphqlDgsDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load talent on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.talent).toEqual(expect.objectContaining({ id: 123 }));
      });
    });
  });
});
