import { gerarMensagem, MENSAGEM_SISTEMA } from '../../commons/constants/mensagem.sistema';
import { criarSwaggerOperacao } from '../../commons/constants/operacao.swagger';
import { gerarRotasRecurso } from '../../commons/constants/url.sustema';

const ENTITY_NAME = 'usuario';
const ALIAS_NAME = 'Usuário';

export const USUARIO = {
  ENTITY: ENTITY_NAME,
  ALIAS: ALIAS_NAME,
  TABLE_FIELDS: {
    ID_USUARIO: 'id_usuario',
    NOME_USUARIO: 'nome_usuario',
    EMAIL_USUARIO: 'emai_usuario',
    SENHA_USUARIO: 'senha_usuario',
    ATIVO: 'ativo',
  },
  SWAGGER: {
    idUsuario: `Codigo do ${ENTITY_NAME} de identificacao unica`,
    nomeUsuario: `Nome do ${ENTITY_NAME} `,
    email: `Email do ${ENTITY_NAME} `,
    senha: `Senha de acesso do ${ENTITY_NAME}`,
    ativo: `Status do ${ENTITY_NAME} no sistema`,
  },
  MENSAGEM: getMensagem(ALIAS_NAME),
  OPERACAO: criarSwaggerOperacao(ENTITY_NAME),
  ROTA: gerarRotasRecurso(ENTITY_NAME),
};

function getMensagem(ENTITY: string) {
  return {
    ENTIDADE_NAO_ENCONTRADA: gerarMensagem(MENSAGEM_SISTEMA.ENTIDADE_NAO_ENCONTRADA, ENTITY),
    ENTIDADE_CADASTRADA: gerarMensagem(MENSAGEM_SISTEMA.ENTIDADE_CADASTRADA, ENTITY),
    ENTIDADE_ALTERADA: gerarMensagem(MENSAGEM_SISTEMA.ENTIDADE_ALTERADA, ENTITY),
    ENTIDADE_EXCLUIDA: gerarMensagem(MENSAGEM_SISTEMA.ENTIDADE_EXCLUIDA, ENTITY),
    ENTIDADE_LOCALIZADA: gerarMensagem(MENSAGEM_SISTEMA.ENTIDADE_LOCALIZADA, ENTITY),
    ENTIDADE_LISTAGEM: gerarMensagem(MENSAGEM_SISTEMA.ENTIDADE_LISTAGEM, ENTITY),
  };
}

export const fieldusuarios = Object.values(USUARIO.TABLE_FIELDS);
