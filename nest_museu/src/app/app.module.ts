import { Module } from '@nestjs/common';
import { UsuarioModule } from '../usuario/usuario.module';
import { DataBaseModule } from '../database/database.module';
import { ConfigModule } from '@nestjs/config';

const modules = [UsuarioModule, DataBaseModule];

@Module({
  imports: [ConfigModule.forRoot(), ...modules],
})
export class AppModule {}
