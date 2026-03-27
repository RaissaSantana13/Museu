import { ApiProperty } from '@nestjs/swagger';
import { TextField } from '../../../commons/decorators/text.decorators';
import { USUARIO } from '../../constants/usuario.constants';

export class UsuarioRequest {
  static entityName = USUARIO.ALIAS.toLocaleLowerCase();
  @TextField({ required: true, min: 6, max: 100, label: 'Nome', gender: 'f' })
  @ApiProperty({ description: USUARIO.SWAGGER.nomeUsuario, example: 'Jose da Silva' })
  nomeUsuario!: string;
  @TextField({ required: true, min: 6, max: 100, label: 'E-mail', gender: 'm', email: true })
  @ApiProperty({ description: USUARIO.SWAGGER.email, example: 'jose@gmail.com' })
  email!: string;
  @TextField({ required: true, min: 6, max: 20, label: 'senha', gender: 'f' })
  @ApiProperty({ description: USUARIO.SWAGGER.senha, example: '12345678' })
  senha!: string;

  constructor(data: Partial<UsuarioRequest> = {}) {
    Object.assign(this, data);
  }
}
