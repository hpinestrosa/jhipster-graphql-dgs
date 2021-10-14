import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'category-graphql-dgs',
        data: { pageTitle: 'jhipsterGraphqlDgsApp.category.home.title' },
        loadChildren: () => import('./category-graphql-dgs/category-graphql-dgs.module').then(m => m.CategoryGraphqlDgsModule),
      },
      {
        path: 'content-type-graphql-dgs',
        data: { pageTitle: 'jhipsterGraphqlDgsApp.contentType.home.title' },
        loadChildren: () => import('./content-type-graphql-dgs/content-type-graphql-dgs.module').then(m => m.ContentTypeGraphqlDgsModule),
      },
      {
        path: 'genre-graphql-dgs',
        data: { pageTitle: 'jhipsterGraphqlDgsApp.genre.home.title' },
        loadChildren: () => import('./genre-graphql-dgs/genre-graphql-dgs.module').then(m => m.GenreGraphqlDgsModule),
      },
      {
        path: 'language-graphql-dgs',
        data: { pageTitle: 'jhipsterGraphqlDgsApp.language.home.title' },
        loadChildren: () => import('./language-graphql-dgs/language-graphql-dgs.module').then(m => m.LanguageGraphqlDgsModule),
      },
      {
        path: 'region-graphql-dgs',
        data: { pageTitle: 'jhipsterGraphqlDgsApp.region.home.title' },
        loadChildren: () => import('./region-graphql-dgs/region-graphql-dgs.module').then(m => m.RegionGraphqlDgsModule),
      },
      {
        path: 'role-graphql-dgs',
        data: { pageTitle: 'jhipsterGraphqlDgsApp.role.home.title' },
        loadChildren: () => import('./role-graphql-dgs/role-graphql-dgs.module').then(m => m.RoleGraphqlDgsModule),
      },
      {
        path: 'title-type-graphql-dgs',
        data: { pageTitle: 'jhipsterGraphqlDgsApp.titleType.home.title' },
        loadChildren: () => import('./title-type-graphql-dgs/title-type-graphql-dgs.module').then(m => m.TitleTypeGraphqlDgsModule),
      },
      {
        path: 'title-graphql-dgs',
        data: { pageTitle: 'jhipsterGraphqlDgsApp.title.home.title' },
        loadChildren: () => import('./title-graphql-dgs/title-graphql-dgs.module').then(m => m.TitleGraphqlDgsModule),
      },
      {
        path: 'talent-graphql-dgs',
        data: { pageTitle: 'jhipsterGraphqlDgsApp.talent.home.title' },
        loadChildren: () => import('./talent-graphql-dgs/talent-graphql-dgs.module').then(m => m.TalentGraphqlDgsModule),
      },
      {
        path: 'talent-role-graphql-dgs',
        data: { pageTitle: 'jhipsterGraphqlDgsApp.talentRole.home.title' },
        loadChildren: () => import('./talent-role-graphql-dgs/talent-role-graphql-dgs.module').then(m => m.TalentRoleGraphqlDgsModule),
      },
      {
        path: 'talent-title-graphql-dgs',
        data: { pageTitle: 'jhipsterGraphqlDgsApp.talentTitle.home.title' },
        loadChildren: () => import('./talent-title-graphql-dgs/talent-title-graphql-dgs.module').then(m => m.TalentTitleGraphqlDgsModule),
      },
      {
        path: 'title-aka-graphql-dgs',
        data: { pageTitle: 'jhipsterGraphqlDgsApp.titleAka.home.title' },
        loadChildren: () => import('./title-aka-graphql-dgs/title-aka-graphql-dgs.module').then(m => m.TitleAkaGraphqlDgsModule),
      },
      {
        path: 'title-genre-graphql-dgs',
        data: { pageTitle: 'jhipsterGraphqlDgsApp.titleGenre.home.title' },
        loadChildren: () => import('./title-genre-graphql-dgs/title-genre-graphql-dgs.module').then(m => m.TitleGenreGraphqlDgsModule),
      },
      {
        path: 'title-principal-graphql-dgs',
        data: { pageTitle: 'jhipsterGraphqlDgsApp.titlePrincipal.home.title' },
        loadChildren: () =>
          import('./title-principal-graphql-dgs/title-principal-graphql-dgs.module').then(m => m.TitlePrincipalGraphqlDgsModule),
      },
      {
        path: 'title-aka-title-type-graphql-dgs',
        data: { pageTitle: 'jhipsterGraphqlDgsApp.titleAkaTitleType.home.title' },
        loadChildren: () =>
          import('./title-aka-title-type-graphql-dgs/title-aka-title-type-graphql-dgs.module').then(
            m => m.TitleAkaTitleTypeGraphqlDgsModule
          ),
      },
      {
        path: 'title-episode-graphql-dgs',
        data: { pageTitle: 'jhipsterGraphqlDgsApp.titleEpisode.home.title' },
        loadChildren: () =>
          import('./title-episode-graphql-dgs/title-episode-graphql-dgs.module').then(m => m.TitleEpisodeGraphqlDgsModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class EntityRoutingModule {}
