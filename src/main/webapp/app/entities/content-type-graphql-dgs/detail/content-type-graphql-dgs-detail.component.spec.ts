import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ContentTypeGraphqlDgsDetailComponent } from './content-type-graphql-dgs-detail.component';

describe('Component Tests', () => {
  describe('ContentTypeGraphqlDgs Management Detail Component', () => {
    let comp: ContentTypeGraphqlDgsDetailComponent;
    let fixture: ComponentFixture<ContentTypeGraphqlDgsDetailComponent>;

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [ContentTypeGraphqlDgsDetailComponent],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: { data: of({ contentType: { id: 123 } }) },
          },
        ],
      })
        .overrideTemplate(ContentTypeGraphqlDgsDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ContentTypeGraphqlDgsDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load contentType on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.contentType).toEqual(expect.objectContaining({ id: 123 }));
      });
    });
  });
});
