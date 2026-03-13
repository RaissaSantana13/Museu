import { applyDecorators, HttpStatus, Type } from '@nestjs/common';
import { ApiBody, ApiConsumes, ApiOperation, ApiParam, ApiProduces, ApiResponse } from '@nestjs/swagger';

export interface ApiSwaggerOperationProps {
  ACAO: string;
  SUCESSO: string;
  ERRO: string;
  NAO_LOCALIZADO?: string;
  EXISTE?: string;
}

export const JSON_APPLICATION = 'application/json';

export function ApiGetDoc(config: ApiSwaggerOperationProps, request: Type<any>, response: Type<any>) {
  return applyDecorators(
    ApiOperation({
      summary: config.ACAO,
    }),
    ApiBody({ type: request }),
    ApiParam({ name: 'id', description: 'ID único do recurso' }),
    ApiResponse({
      status: HttpStatus.OK,
      description: config.SUCESSO,
      type: response,
    }),
    ApiResponse({
      status: HttpStatus.BAD_REQUEST,
      description: config.ERRO,
    }),
    ApiResponse({
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      description: 'Erro interno no servidor de aplicação ',
    }),
    ApiResponse({
      status: HttpStatus.NOT_FOUND,
      description: config?.NAO_LOCALIZADO,
    }),
    ApiConsumes(JSON_APPLICATION),
    ApiProduces(JSON_APPLICATION),
  );
}

export function ApiPostDoc(config: ApiSwaggerOperationProps, request: Type<any>, response: Type<any>) {
  return applyDecorators(
    ApiOperation({
      summary: config.ACAO,
    }),
    ApiBody({ type: request }),
    ApiResponse({
      status: HttpStatus.CREATED,
      description: config.SUCESSO,
      type: response,
    }),
    ApiResponse({
      status: HttpStatus.BAD_REQUEST,
      description: config.ERRO,
    }),
    ApiResponse({
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      description: 'Erro interno no servidor de aplicação ',
    }),
    ApiResponse({
      status: HttpStatus.NOT_FOUND,
      description: config?.NAO_LOCALIZADO,
    }),
    ApiConsumes(JSON_APPLICATION),
    ApiProduces(JSON_APPLICATION),
  );
}

export function ApiPutDoc(config: ApiSwaggerOperationProps, request: Type<any>, response: Type<any>) {
  return applyDecorators(
    ApiOperation({
      summary: config.ACAO,
    }),
    ApiParam({ name: 'id', description: 'ID único do recurso' }),
    ApiBody({ type: request }),
    ApiResponse({
      status: HttpStatus.OK,
      description: config.SUCESSO,
      type: response,
    }),
    ApiResponse({
      status: HttpStatus.BAD_REQUEST,
      description: config.ERRO,
    }),
    ApiResponse({
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      description: 'Erro interno no servidor de aplicação ',
    }),
    ApiResponse({
      status: HttpStatus.NOT_FOUND,
      description: config?.NAO_LOCALIZADO,
    }),
    ApiConsumes(JSON_APPLICATION),
    ApiProduces(JSON_APPLICATION),
  );
}

export function ApiDeleteDoc(config: ApiSwaggerOperationProps) {
  return applyDecorators(
    ApiOperation({
      summary: config.ACAO,
    }),
    ApiParam({ name: 'id', description: 'ID único do recurso' }),
    ApiResponse({
      status: HttpStatus.OK,
      description: config.SUCESSO,
    }),
    ApiResponse({
      status: HttpStatus.BAD_REQUEST,
      description: config.ERRO,
    }),
    ApiResponse({
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      description: 'Erro interno no servidor de aplicação ',
    }),
    ApiResponse({
      status: HttpStatus.NOT_FOUND,
      description: config?.NAO_LOCALIZADO,
    }),
    ApiProduces(JSON_APPLICATION),
  );
}

export function ApiListDoc(config: ApiSwaggerOperationProps, response: Type<any>) {
  return applyDecorators(
    ApiOperation({
      summary: config.ACAO,
    }),
    ApiResponse({
      status: HttpStatus.OK,
      description: config.SUCESSO,
      type: response,
    }),
    ApiResponse({
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      description: 'Erro interno no servidor de aplicação ',
    }),
    ApiProduces(JSON_APPLICATION),
  );
}
