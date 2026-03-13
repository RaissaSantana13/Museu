import { gerarMensagem, MENSAGEM_SISTEMA } from '../../commons/constants/mensagem.sistema';
import { criarSwaggerOperacao } from '../../commons/constants/operacao.swagger';

const ENTITY_NAME = 'Usuario';
const ALIAS_NAME = 'Usuário';

export const USUARIO = {
  MENSAGEM: getMensagem(ALIAS_NAME),
  OPERACAO: criarSwaggerOperacao(ENTITY_NAME),
};

function getMensagem(ENTITY: string) {
  return {
    ENTIDADE_NAO_ENCONTRADA: gerarMensagem(MENSAGEM_SISTEMA.ENTIDADE_NAO_ENCONTRADA, ENTITY),
    ENTIDADE_CADASTRADA: gerarMensagem(MENSAGEM_SISTEMA.ENTIDADE_CADASTRADA, ENTITY),
    ENTIDADE_ALTERADA: gerarMensagem(MENSAGEM_SISTEMA.ENTIDADE_ALTERADA, ENTITY),
    ENTIDADE_EXCLUIDA: gerarMensagem(MENSAGEM_SISTEMA.ENTIDADE_EXCLUIDA, ENTITY),
    ENTIDADE_LOCALIZADA: gerarMensagem(MENSAGEM_SISTEMA.ENTIDADE_LOCALIZADA, ENTITY),
  };
}
