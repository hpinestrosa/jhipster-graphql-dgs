export interface ICategoryGraphqlDgs {
  id?: number;
  categoryName?: string;
}

export class CategoryGraphqlDgs implements ICategoryGraphqlDgs {
  constructor(public id?: number, public categoryName?: string) {}
}

export function getCategoryGraphqlDgsIdentifier(category: ICategoryGraphqlDgs): number | undefined {
  return category.id;
}
