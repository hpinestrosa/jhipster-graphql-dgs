export interface IContentTypeGraphqlDgs {
  id?: number;
  contentTypeName?: string;
}

export class ContentTypeGraphqlDgs implements IContentTypeGraphqlDgs {
  constructor(public id?: number, public contentTypeName?: string) {}
}

export function getContentTypeGraphqlDgsIdentifier(contentType: IContentTypeGraphqlDgs): number | undefined {
  return contentType.id;
}
