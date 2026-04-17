import { AxiosRequestConfig } from 'axios';
import { http } from '../../lib/http';
import { ApiResponse, PageResponse, SearchParam } from '../../type/api';

export class ConnectionService<T, TCreate = T, TUpdate = T> {
  constructor(
    readonly url: string,
    readonly config?: AxiosRequestConfig,
  ) {}

  async listar(params: SearchParam): Promise<ApiResponse<PageResponse<T>>> {
    const response = await http.get(this.url, { ...params, ...this.config });
    return response.data;
  }

  async salvar(body: TCreate): Promise<ApiResponse<T>> {
    const response = await http.post<ApiResponse<T>>(this.url, body, { ...this.config });
    return response.data;
  }

  async atualizar(id: number | string, body: TUpdate): Promise<ApiResponse<T>> {
    const response = await http.put<ApiResponse<T>>(`${this.url}/${id}`, body, { ...this.config });
    return response.data;
  }
}
