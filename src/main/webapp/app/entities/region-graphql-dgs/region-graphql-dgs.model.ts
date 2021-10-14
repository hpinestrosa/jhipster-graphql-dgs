export interface IRegionGraphqlDgs {
  id?: number;
  regionName?: string | null;
}

export class RegionGraphqlDgs implements IRegionGraphqlDgs {
  constructor(public id?: number, public regionName?: string | null) {}
}

export function getRegionGraphqlDgsIdentifier(region: IRegionGraphqlDgs): number | undefined {
  return region.id;
}
