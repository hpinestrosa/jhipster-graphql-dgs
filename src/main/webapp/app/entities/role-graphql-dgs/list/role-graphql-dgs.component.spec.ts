import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { RoleGraphqlDgsService } from '../service/role-graphql-dgs.service';

import { RoleGraphqlDgsComponent } from './role-graphql-dgs.component';

describe('Component Tests', () => {
  describe('RoleGraphqlDgs Management Component', () => {
    let comp: RoleGraphqlDgsComponent;
    let fixture: ComponentFixture<RoleGraphqlDgsComponent>;
    let service: RoleGraphqlDgsService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [RoleGraphqlDgsComponent],
      })
        .overrideTemplate(RoleGraphqlDgsComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(RoleGraphqlDgsComponent);
      comp = fixture.componentInstance;
      service = TestBed.inject(RoleGraphqlDgsService);

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
      expect(comp.roles?.[0]).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
