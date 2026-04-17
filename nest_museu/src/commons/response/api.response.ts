export interface ApiResponse<T> {
  status: number;
  timestamp: string;
  mensagem?: string | null;
  erro?: string | null;
  path?: string;
  metodo?: string;
  dados?: T | T[] | null;
}
