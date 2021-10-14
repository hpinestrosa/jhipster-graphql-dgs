import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { RoleGraphqlDgsDetailComponent } from './role-graphql-dgs-detail.component';

describe('Component Tests', () => {
  describe('RoleGraphqlDgs Management Detail Component', () => {
    let comp: RoleGraphqlDgsDetailComponent;
    let fixture: ComponentFixture<RoleGraphqlDgsDetailComponent>;

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [RoleGraphqlDgsDetailComponent],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: { data: of({ role: { id: 123 } }) },
          },
        ],
      })
        .overrideTemplate(RoleGraphqlDgsDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(RoleGraphqlDgsDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load role on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.role).toEqual(expect.objectContaining({ id: 123 }));
      });
    });
  });
});
