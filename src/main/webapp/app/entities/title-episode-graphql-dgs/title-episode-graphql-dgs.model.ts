export interface ITitleEpisodeGraphqlDgs {
  id?: number;
  parentTitle?: string | null;
  seasonNumber?: number | null;
  episodeNumber?: number | null;
}

export class TitleEpisodeGraphqlDgs implements ITitleEpisodeGraphqlDgs {
  constructor(
    public id?: number,
    public parentTitle?: string | null,
    public seasonNumber?: number | null,
    public episodeNumber?: number | null
  ) {}
}

export function getTitleEpisodeGraphqlDgsIdentifier(titleEpisode: ITitleEpisodeGraphqlDgs): number | undefined {
  return titleEpisode.id;
}
