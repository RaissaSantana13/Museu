import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { USUARIO } from '../constants/usuario.constants';

@Entity(USUARIO.ENTITY)
export class Usuario {
  @PrimaryGeneratedColumn({ name: 'ID_USUARIO' })
  idUsuario: number = 0;
  @Column({ name: 'NOME_USUARIO', length: 150 })
  nomeUsuario: string = '';
  @Column({ name: 'EMAIL_USUARIO', length: 150 })
  email: string = '';
  @Column({ name: 'SENHA_USUSARIO', length: 150 })
  senha: string = '';
  @Column({ name: 'ATIVO', length: 150 })
  ativo: boolean = true;
}
