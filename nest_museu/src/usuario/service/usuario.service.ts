import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { EntityNotFoundException } from '../../commons/exception/error/entitynotfound.exception';
import { SaveException } from '../../commons/exception/error/save.exception';
import { Pageable } from '../../commons/pagination/pageable.response';
import { Page } from '../../commons/pagination/pagination.system';
import { fieldusuarios, USUARIO } from '../constants/usuario.constants';
import { UsuarioConverter } from '../dto/converter/usuario.converter';
import { UsuarioRequest } from '../dto/request/usuario.request';
import { UsuarioResponse } from '../dto/response/usuario.response';
import { Usuario } from '../entities/usuario.entity';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>,
  ) {}

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
      query.where(`${field} LIKE :search_pesquisa`, {
        search_pesquisa: `%${search}%`,
      });
    }

    const [usuarios, totalElements] = await query.getManyAndCount();

    const listaUsuarios = UsuarioConverter.toListarUsuarioResponse(usuarios);

    return Page.of(listaUsuarios, totalElements, pageable);
  }

  async porId(id: number): Promise<UsuarioResponse> {
    const usuario = await this.buscarPorId(id);
    return UsuarioConverter.toUsuarioResponse(usuario);
  }

  async salvar(usuarioRequest: UsuarioRequest): Promise<UsuarioResponse> {
    const novoUsuario = UsuarioConverter.toUsuario(usuarioRequest);

    try {
      novoUsuario.senha = await bcrypt.hash(usuarioRequest.senha, 10);

      const usuarioCadastrado = await this.usuarioRepository.save(novoUsuario);

      return UsuarioConverter.toUsuarioResponse(usuarioCadastrado);
    } catch (error: any) {
      throw new InternalServerErrorException(`Erro no cadastro do usuario - ${error.message}`);
    }
  }

  async atualizar(id: number, usuarioRequest: UsuarioRequest): Promise<UsuarioResponse> {
    const usuarioCadastrado = await this.buscarPorId(id);

    try {
      const dadosNovos = UsuarioConverter.toUsuario(usuarioRequest);
      dadosNovos.idUsuario = id;
      const usuarioParaSalvar = Object.assign(usuarioCadastrado, dadosNovos);
      const usuarioAtualizado = await this.usuarioRepository.save(usuarioParaSalvar);
      if (usuarioAtualizado === null) {
        throw new SaveException('Usuario nao cadastrado');
      }
      return UsuarioConverter.toUsuarioResponse(usuarioAtualizado);
    } catch (error: any) {
      throw new InternalServerErrorException(`Erro na atualizacao do usuario - ${error.message}`);
    }
  }

  async excluir(id: number): Promise<void> {
    const usuario = await this.buscarPorId(id);

    try {
      await this.usuarioRepository.remove(usuario);
    } catch (error: any) {
      throw new InternalServerErrorException(`Erro na exclusao do usuario - ${error.message}`);
    }
  }

  async buscarPorId(id: number): Promise<Usuario> {
    try {
      const usuario = await this.usuarioRepository
        .createQueryBuilder('usuario')
        .where(`usuario.id_usuario = :id`, { id })
        .getOne();

      if (!usuario) {
        throw new EntityNotFoundException(USUARIO.MENSAGEM.ENTIDADE_NAO_ENCONTRADA);
      }

      return usuario;
    } catch (error: any) {
      throw new InternalServerErrorException(`Erro na bsuca do id - ${error.message}`);
    }
  }
}
