import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TitleEpisodeGraphqlDgsDetailComponent } from './title-episode-graphql-dgs-detail.component';

describe('Component Tests', () => {
  describe('TitleEpisodeGraphqlDgs Management Detail Component', () => {
    let comp: TitleEpisodeGraphqlDgsDetailComponent;
    let fixture: ComponentFixture<TitleEpisodeGraphqlDgsDetailComponent>;

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [TitleEpisodeGraphqlDgsDetailComponent],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: { data: of({ titleEpisode: { id: 123 } }) },
          },
        ],
      })
        .overrideTemplate(TitleEpisodeGraphqlDgsDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(TitleEpisodeGraphqlDgsDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load titleEpisode on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.titleEpisode).toEqual(expect.objectContaining({ id: 123 }));
      });
    });
  });
});
