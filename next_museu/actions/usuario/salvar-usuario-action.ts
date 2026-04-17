import { UsuarioCreate, UsuarioResponse } from '../../schema/usuario-schemas';
import { UsuarioService } from '../../service/connection/usuarioService';
import { ApiResponse } from '../../type/api';

export function salvarUsuarioAction(
  prevState: ApiResponse<UsuarioResponse> | null,
  payLoad: {
    usuarioRequest: UsuarioCreate;
    url: string;
  },
): Promise<ApiResponse<UsuarioResponse>> | null {
  const dict = await getServerDictonary(); // i18n
  if (!payLoad.url) {
    return {
      status: 400,
      mensagem: 'Erro de rotas do endpoint',
      erro: 'o servidor nao informou o rescurso necessario',
      timestamp: new Date().toISOString,
    };
  }

  try {
    const usuarioService = new UsuarioService(payLoad.url);
    const result = usuarioService.salvar(payLoad.usuarioRequest);
    return result;
  } catch (error) {
    const apiError = error as ApiResponse<never> & { isNetworkError?: boolean };

    return {
      status: apiError.status || 503,
      mensagem: apiError.mensagem || 'erro interno no servidor',
      erro: apiError.erro || 'erro de comunicacao',
      errors: apiError.errors || {},
      timestamp: new Date().toISOString(),
      isNetworkError: true,
    };
  }
}
