export interface ITitleTypeGraphqlDgs {
  id?: number;
  titleTypeName?: string;
}

export class TitleTypeGraphqlDgs implements ITitleTypeGraphqlDgs {
  constructor(public id?: number, public titleTypeName?: string) {}
}

export function getTitleTypeGraphqlDgsIdentifier(titleType: ITitleTypeGraphqlDgs): number | undefined {
  return titleType.id;
}
