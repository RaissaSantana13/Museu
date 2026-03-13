export function criarSwaggerOperacao(ENTITY_NAME: string) {
  return {
    LISTAR: {
      ACAO: `Listagem dos cadastros de ${ENTITY_NAME} existentes no sistema`,
      SUCESSO: `a consulta dos cadastros de ${ENTITY_NAME} foi realizada com sucesso`,
      ERRO: `Falha na consulta dos cadastros de ${ENTITY_NAME} no sistema`,
    },
    PORID: {
      ACAO: `Mostrar cadstro de ${ENTITY_NAME} por identificador unico no sistema`,
      SUCESSO: `O cadastro ${ENTITY_NAME} foi localizado com sucesso`,
      ERRO: `O cadastro de ${ENTITY_NAME} nao foi localizado no sistema`,
      NAO_LOCALIZADO: `O codigo informado no cadastro de ${ENTITY_NAME} nao foi localizado no sistema`,
    },
    SALVAR: {
      ACAO: `Criar um novo cadastro de ${ENTITY_NAME} com identificador unico no sistema`,
      SUCESSO: `O cadastro ${ENTITY_NAME} foi criado com sucesso`,
      ERRO: `O cadastro de ${ENTITY_NAME} nao foi criado no sistema`,
      EXISTE: `${ENTITY_NAME} na cadastrado no sistema`,
    },
    ATUALIZAR: {
      ACAO: `Atualizar o cadastro de ${ENTITY_NAME} com identificador unico no sistema`,
      SUCESSO: `O cadastro ${ENTITY_NAME} foi excluido com sucesso`,
      ERRO: `O cadastro de ${ENTITY_NAME} nao foi atualizado no sistema`,
      NAO_LOCALIZADO: `${ENTITY_NAME} nao foi localizado no sistema`,
    },
    EXCLUIR: {
      ACAO: `Excluir o cadastro de ${ENTITY_NAME} com identificador unico no sistema`,
      SUCESSO: `O cadastro ${ENTITY_NAME} foi excluido com sucesso`,
      ERRO: `O cadastro de ${ENTITY_NAME} nao foi excluido no sistema`,
      NAO_LOCALIZADO: `${ENTITY_NAME} nao foi localizado no sistema`,
    },
  };
}
