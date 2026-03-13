export enum MENSAGEM_SISTEMA {
  ENTIDADE_NAO_ENCONTRADA = 'ENTIDADE_NAO_ENCONTRADA',
  ENTIDADE_CADASTRADA = 'ENTIDADE_CADASTRADA',
  ENTIDADE_ALTERADA = 'ENTIDADE_ALTERADA',
  ENTIDADE_EXCLUIDA = 'ENTIDADE_EXCLUIDA',
  ENTIDADE_LOCALIZADA = 'ENTIDADE_LOCALIZADA',
  ENTIDADE_LISTAGEM = 'ENTIDADE_LISTAGEM',
  EMAIL_CADASTRADO = 'EMAIL_CADASTRADO',
}

type MensagemValor = string | ((...args: any[]) => string);

type MensagemGenericas = {
  [key in MENSAGEM_SISTEMA]: MensagemValor;
};

const MENSAGEM_GENERICA: MensagemGenericas = {
  [MENSAGEM_SISTEMA.ENTIDADE_NAO_ENCONTRADA]: (entidade: string) => `${entidade} nao localizada no sistema`,
  [MENSAGEM_SISTEMA.ENTIDADE_CADASTRADA]: (entidade: string) => `${entidade} foi cadastrada no sistema`,
  [MENSAGEM_SISTEMA.ENTIDADE_ALTERADA]: (entidade: string) => `${entidade} foi alterada no sistema`,
  [MENSAGEM_SISTEMA.ENTIDADE_EXCLUIDA]: (entidade: string) => `${entidade} foi excluida do sistema`,
  [MENSAGEM_SISTEMA.ENTIDADE_LOCALIZADA]: (entidade: string) => `${entidade} foi localizada no sistema`,
  [MENSAGEM_SISTEMA.ENTIDADE_LISTAGEM]: (entidade: string) => `Listagem de ${entidade} foi processada com sucesso`,
  [MENSAGEM_SISTEMA.EMAIL_CADASTRADO]: (entidade: string) =>
    `O endereco de email para ${entidade} ja existe no sistema`,
};

export function gerarMensagem(chave: MENSAGEM_SISTEMA, ...params: any[]): string {
  const mensagem = MENSAGEM_GENERICA[chave];
  if (typeof mensagem == 'function') {
    return mensagem(...params);
  }
  return mensagem;
}
