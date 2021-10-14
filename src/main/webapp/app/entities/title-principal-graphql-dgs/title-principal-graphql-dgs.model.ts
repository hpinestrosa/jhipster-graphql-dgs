export interface ITitlePrincipalGraphqlDgs {
  id?: number;
  category?: number;
  job?: string | null;
  roleNames?: string | null;
}

export class TitlePrincipalGraphqlDgs implements ITitlePrincipalGraphqlDgs {
  constructor(public id?: number, public category?: number, public job?: string | null, public roleNames?: string | null) {}
}

export function getTitlePrincipalGraphqlDgsIdentifier(titlePrincipal: ITitlePrincipalGraphqlDgs): number | undefined {
  return titlePrincipal.id;
}
