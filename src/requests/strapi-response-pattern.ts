type StrapiPagination = {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
};

type StrapiMeta = {
  pagination: StrapiPagination;
  userRank?: number;
};

export type StrapiResponse<T> = {
  data: T;
  meta: StrapiMeta;
};
