import { PAGINATION } from '../enum/pagination.enum';

export class Pageable {
  readonly page: number;
  readonly pageSize: number;
  readonly field: string;
  readonly sort: PAGINATION.ASC | PAGINATION.DESC;

  constructor(
    page: number = 1,
    pageSize: number = 5,
    field?: string,
    sort?: string,
    private readonly allowedFields: string[] = [],
  ) {
    this.page = page < 1 ? 1 : page;
    this.pageSize = pageSize < 0 ? 5 : pageSize;
    const defaultField = allowedFields[0];
    this.field = allowedFields.includes(field ?? '') ? field! : defaultField;
    this.sort = sort?.toUpperCase() === PAGINATION.DESC ? PAGINATION.DESC : PAGINATION.ASC;
  }
  get offset(): number {
    return (this.page - 1) * this.pageSize;
  }

  get limit(): number {
    return this.pageSize;
  }
}
