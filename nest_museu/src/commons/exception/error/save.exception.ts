import { HttpStatus } from '@nestjs/common';
import { NegocioException } from './negocio.exeption';

export class SaveException extends NegocioException {
  constructor(message: string, error?: string | null) {
    super({
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      message,
      error: error ?? 'Erro ao gravar a entidade',
    });
  }
}
