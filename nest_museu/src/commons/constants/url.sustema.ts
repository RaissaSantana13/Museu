export type RotasRecurso = {
  BASE: string;
  ID: string;
};

export function gerarRotasRecurso(ENTITY_NAME: string): RotasRecurso {
  return {
    BASE: ENTITY_NAME,
    ID: ':id',
  };
}
