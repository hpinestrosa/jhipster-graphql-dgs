export interface ILanguageGraphqlDgs {
  id?: number;
  languageName?: string | null;
}

export class LanguageGraphqlDgs implements ILanguageGraphqlDgs {
  constructor(public id?: number, public languageName?: string | null) {}
}

export function getLanguageGraphqlDgsIdentifier(language: ILanguageGraphqlDgs): number | undefined {
  return language.id;
}
