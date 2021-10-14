import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { TalentRoleGraphqlDgsService } from '../service/talent-role-graphql-dgs.service';

import { TalentRoleGraphqlDgsComponent } from './talent-role-graphql-dgs.component';

describe('Component Tests', () => {
  describe('TalentRoleGraphqlDgs Management Component', () => {
    let comp: TalentRoleGraphqlDgsComponent;
    let fixture: ComponentFixture<TalentRoleGraphqlDgsComponent>;
    let service: TalentRoleGraphqlDgsService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [TalentRoleGraphqlDgsComponent],
      })
        .overrideTemplate(TalentRoleGraphqlDgsComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(TalentRoleGraphqlDgsComponent);
      comp = fixture.componentInstance;
      service = TestBed.inject(TalentRoleGraphqlDgsService);

      const headers = new HttpHeaders().append('link', 'link;link');
      jest.spyOn(service, 'query').mockReturnValue(
        of(
          new HttpResponse({
            body: [{ id: 123 }],
            headers,
          })
        )
      );
    });

    it('Should call load all on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.talentRoles?.[0]).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
