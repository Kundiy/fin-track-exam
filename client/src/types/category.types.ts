export type Category = {
  id: string;
  name: string;
  categoryTypeId: CategoryType;
};

export type CategoryTypes = {
  id: string;
  kind: string;
  caption: string;
}

export type CategoryState = {
  types: CategoryTypes[],
  categories: Category[],
  currentType: CategoryType,
  currentCategory: Category | null,
  error?: string;
};
export type requestDate = {
  name: string;
  categoryTypeId: CategoryType;
}

export type responseDate = {
  id: string;
  name: string;
  categoryTypeId: CategoryType;
  amount: string;
}

export type CategoryType = string;