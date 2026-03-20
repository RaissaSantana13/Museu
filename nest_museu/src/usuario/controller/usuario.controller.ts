import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Query, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import {
  ApiDeleteDoc,
  ApiGetDoc,
  ApiListDoc,
  ApiPostDoc,
  ApiPutDoc,
} from '../../commons/decorators/swagger.decorators';
import { PAGINATION } from '../../commons/enum/pagination.enum';
import { Page } from '../../commons/pagination/pagination.system';
import { ApiResponse } from '../../commons/response/api.response';
import { ResponseBuilder } from '../../commons/response/builder.response';
import { USUARIO } from '../constants/usuario.constants';
import { UsuarioRequest } from '../dto/request/usuario.request';
import { UsuarioResponse } from '../dto/response/usuario.response';
import { UsuarioService } from '../service/usuario.service';

@ApiTags(USUARIO.ALIAS)
@Controller(USUARIO.ENTITY)
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}
  @Get()
  @ApiListDoc(USUARIO.OPERACAO.LISTAR, UsuarioResponse)
  async listar(
    @Req() req: Request,
    @Query('page') page?: number,
    @Query('pageSize') pageSize?: number,
    @Query('field') field?: string,
    @Query('sort') sort?: 'ASC' | 'DESC',
    @Query('search') search?: string,
  ): Promise<ApiResponse<Page<UsuarioResponse>>> {
    const pageController = page ? page : PAGINATION.PAGE;
    const pageSizeController = pageSize ? pageSize : PAGINATION.PAGESIZE;
    const fieldController = field ? field : USUARIO.TABLE_FIELDS.ID_USUARIO;
    const sortController = sort ? sort : PAGINATION.ASC;
    const response = await this.usuarioService.listar(
      pageController,
      pageSizeController,
      fieldController,
      sortController,
      search,
    );
    return ResponseBuilder.status<Page<UsuarioResponse>>(HttpStatus.OK)
      .mensagem(USUARIO.MENSAGEM.ENTIDADE_LISTAGEM)
      .path(req.path)
      .metodo(req.method)
      .dados(response)
      .build();
  }
  @Get(USUARIO.ROTA.ID)
  @ApiGetDoc(USUARIO.OPERACAO.PORID, UsuarioRequest, UsuarioResponse)
  porId(@Param('id') id: number, @Req() req: Request) {
    const response = this.usuarioService.porId(id);
    return ResponseBuilder.status<UsuarioResponse>(HttpStatus.OK)
      .mensagem(USUARIO.MENSAGEM.ENTIDADE_LOCALIZADA)
      .path(req.path)
      .metodo(req.method)
      .dados(response)
      .build();
  }
  @Post()
  @ApiPostDoc(USUARIO.OPERACAO.SALVAR, UsuarioRequest, UsuarioResponse)
  salvar(@Body() usuarioRequest: UsuarioRequest, @Req() req: Request) {
    const response = this.usuarioService.salvar(usuarioRequest);
    return ResponseBuilder.status<UsuarioResponse>(HttpStatus.OK)
      .mensagem(USUARIO.MENSAGEM.ENTIDADE_CADASTRADA)
      .path(req.path)
      .metodo(req.method)
      .dados(response)
      .build();
  }
  @Put(USUARIO.ROTA.ID)
  @ApiPutDoc(USUARIO.OPERACAO.ATUALIZAR, UsuarioRequest, UsuarioResponse)
  atualizar(@Param('id') id: number, @Body() usuarioRequest: UsuarioRequest, @Req() req: Request) {
    const response = this.usuarioService.atualizar(id, usuarioRequest);
    return ResponseBuilder.status<UsuarioResponse>(HttpStatus.OK)
      .mensagem(USUARIO.MENSAGEM.ENTIDADE_ALTERADA)
      .path(req.path)
      .metodo(req.method)
      .dados(response)
      .build();
  }
  @Delete(USUARIO.ROTA.ID)
  @ApiDeleteDoc(USUARIO.OPERACAO.EXCLUIR)
  deletar(@Param('id') id: number, @Req() req: Request) {
    return ResponseBuilder.status<UsuarioResponse>(HttpStatus.OK)
      .mensagem(USUARIO.MENSAGEM.ENTIDADE_EXCLUIDA)
      .path(req.path)
      .build();
  }
}
