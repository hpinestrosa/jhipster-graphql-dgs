import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { TalentTitleGraphqlDgsService } from '../service/talent-title-graphql-dgs.service';

import { TalentTitleGraphqlDgsComponent } from './talent-title-graphql-dgs.component';

describe('Component Tests', () => {
  describe('TalentTitleGraphqlDgs Management Component', () => {
    let comp: TalentTitleGraphqlDgsComponent;
    let fixture: ComponentFixture<TalentTitleGraphqlDgsComponent>;
    let service: TalentTitleGraphqlDgsService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [TalentTitleGraphqlDgsComponent],
      })
        .overrideTemplate(TalentTitleGraphqlDgsComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(TalentTitleGraphqlDgsComponent);
      comp = fixture.componentInstance;
      service = TestBed.inject(TalentTitleGraphqlDgsService);

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
      expect(comp.talentTitles?.[0]).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
