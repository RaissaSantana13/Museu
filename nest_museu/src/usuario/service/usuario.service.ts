import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pageable } from '../../commons/pagination/pageable.response';
import { Page } from '../../commons/pagination/pagination.system';
import { fieldusuarios } from '../constants/usuario.constants';
import { UsuarioConverter } from '../dto/converter/usuario.converter';
import { UsuarioRequest } from '../dto/request/usuario.request';
import { UsuarioResponse } from '../dto/response/usuario.response';
import { Usuario } from '../entities/usuario.entity';

@Injectable()
export class UsuarioService {
  constructor(@InjectRepository(Usuario) private usuarioRepository: Repository<Usuario>) {}
  async listar(
    page: number,
    pageSize: number,
    field: string,
    sort: 'ASC' | 'DESC',
    search?: string,
  ): Promise<Page<UsuarioResponse>> {
    const pageable = new Pageable(page, pageSize, field, sort, fieldusuarios);
    const offset = (page - 1) * pageSize;

    const query = this.usuarioRepository
      .createQueryBuilder('usuario')
      .orderBy(`${field}`, sort)
      .skip(offset)
      .take(pageable.limit);
    if (search) {
      query.where(`${field} LIKE: search_pesquisa`, { search_pesquisa: `%{search}%` });
    }
    const [usuarios, totalElements] = await query.getManyAndCount();
    const listaUsuarios = UsuarioConverter.toListarUsuarioResponse(usuarios);
    return Page.of(listaUsuarios, totalElements, pageable);
  }

  porId(id: number): UsuarioResponse | null {
    return null;
  }
  salvar(usuarioRequest: UsuarioRequest): UsuarioResponse | null {
    return null;
  }
  atualizar(id: number, usuarioRequest: UsuarioRequest) {
    return null;
  }
  apagar(id: number): string | null {
    return null;
  }
}
