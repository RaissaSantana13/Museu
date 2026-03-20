import { Pageable } from './pageable.response';

export class Page<T> {
  readonly content: T[];
  readonly totalPages: number;
  readonly totalElements: number;
  readonly pageSize: number;
  readonly page: number;
  readonly offset: number;
  readonly limit: number;

  constructor(
    content: T[],
    totalPages: number,
    totalElements: number,
    pageSize: number,
    page: number,
    offset: number,
    limit: number,
  ) {
    this.content = content;
    this.totalPages = totalPages;
    this.totalElements = totalElements;
    this.pageSize = pageSize;
    this.page = page;
    this.offset = offset;
    this.limit = limit;
  }
  static of<T>(content: T[], totalElements: number, pageable: Pageable): Page<T> {
    const pageSize = pageable.pageSize;
    const page = pageable.page;
    const limit = pageable.limit;
    const offset = pageable.offset;
    const totalPages = Math.ceil(totalElements / pageSize);

    return new Page(content, totalPages, totalElements, pageSize, page, offset, limit);
  }
}
