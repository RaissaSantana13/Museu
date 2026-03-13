import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { ResponseBuilder } from '../../commons/response/builder.response';
import { USUARIO } from '../constants/usuario.constants';
import { UsuarioRequest } from '../dto/request/usuario.request';
import { UsuarioResponse } from '../dto/response/usuario.response';
import { UsuarioService } from '../service/usuario.service';
import { ApiListDoc, ApiPostDoc, ApiDeleteDoc, ApiPutDoc } from '../../commons/decorators/swagger.decorators';

@ApiTags('Usuario')
@Controller(`usuario`)
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}
  @Get()
  @ApiListDoc(USUARIO.OPERACAO.LISTAR, UsuarioResponse)
  listar(@Req() req: Request) {
    const response = this.usuarioService.listar();
    return ResponseBuilder.status<UsuarioResponse>(HttpStatus.OK)
      .mensagem('Listagem de usuarios')
      .path(req.path)
      .metodo(req.method)
      .dados(response)
      .build();
  }
  @Get(':id')
  @ApiListDoc(USUARIO.OPERACAO.LISTAR, UsuarioResponse)
  poId(@Param('id') id: number, @Req() req: Request) {
    const response = this.usuarioService.porId(id);
    return ResponseBuilder.status<UsuarioResponse>(HttpStatus.OK)
      .mensagem('Usuario localizado no sistema')
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
      .mensagem('Usuario registrado com sucesso')
      .path(req.path)
      .metodo(req.method)
      .dados(response)
      .build();
  }

  @Put(':id')
  @ApiPutDoc(USUARIO.OPERACAO.ATUALIZAR, UsuarioRequest, UsuarioResponse)
  atualizar(@Param('id') id: number, @Body() usuarioRequest: UsuarioRequest, @Req() req: Request) {
    const response = this.usuarioService.atualizar(id, usuarioRequest);
    return ResponseBuilder.status<UsuarioResponse>(HttpStatus.OK)
      .mensagem('Usuario alterado com sucesso')
      .path(req.path)
      .metodo(req.method)
      .dados(response)
      .build();
  }

  @Delete(':id')
  @ApiDeleteDoc(USUARIO.OPERACAO.EXCLUIR)
  deletar(@Param('id') id: number, @Req() req: Request) {
    const response = this.usuarioService.excluir(id);
    return ResponseBuilder.status<UsuarioResponse>(HttpStatus.NO_CONTENT).mensagem(response).path(req.path).build();
  }
}

/*
 controller - criar a rota do recurso - usuario define o prefixo
 get - mapear para /usuario - listar tudo
 get (`id`) - mapear para /usuario/id - listar o objeto especifico 
 Post() - criar o objeto usuario na rota /usuario
 Put(`id`) - atualizar o usuario na rota /usuario/id
 Patch()
 delete(`id`) excluir o objeto usuario na rota /usuario/id 
*/
