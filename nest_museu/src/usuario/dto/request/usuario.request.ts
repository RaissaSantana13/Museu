import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { USUARIO } from '../../constants/usuario.constants';

export class UsuarioRequest {
  @IsString()
  @ApiProperty({ description: USUARIO.SWAGGER.nomeUsuario, example: 'Jose da Silva' })
  nomeUsuario: string = '';
  @IsString()
  @ApiProperty({ description: USUARIO.SWAGGER.email, example: 'jose@gmail.com' })
  email: string = '';
  @IsString()
  @ApiProperty({ description: USUARIO.SWAGGER.senha, example: '12345678' })
  senha: string = '';
}
