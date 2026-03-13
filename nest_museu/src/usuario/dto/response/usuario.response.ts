import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { USUARIO } from '../../constants/usuario.constants';

export class UsuarioResponse {
  @Expose()
  @ApiProperty({ description: USUARIO.SWAGGER.idUsuario, example: '1' })
  idUsuario: number = 0;
  @Expose()
  @ApiProperty({ description: USUARIO.SWAGGER.nomeUsuario, example: 'Jose da Silva' })
  nomeUsuario: string = '';
  @Expose()
  @ApiProperty({ description: USUARIO.SWAGGER.email, example: 'jose@gmail.com' })
  email: string = '';
  @Expose()
  @ApiProperty({ description: USUARIO.SWAGGER.ativo, example: 'ativo | inativo' })
  ativo: boolean = true;
}
