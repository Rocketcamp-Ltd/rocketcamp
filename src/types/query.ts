export interface IPaginationQuery {
  page?: number,
}

export interface ISearchQuery extends IPaginationQuery {
  searchText: string,
}
