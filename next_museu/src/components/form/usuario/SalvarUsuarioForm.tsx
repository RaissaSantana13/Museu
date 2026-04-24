'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { startTransition, useActionState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import z from 'zod';
import { ApiResponse } from '../../../../type/api';
import { salvarUsuarioAction } from '../../../actions/usuario/salvar-usuario-action';
import { UsuarioCreate, UsuarioResponse, UsuarioSchema } from '../../../schema/usuario-schemas';
import { Button } from '../../ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../../ui/card';
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from '../../ui/field';
import { Input } from '../../ui/input';

// estado inicial
const initState: ApiResponse<UsuarioResponse> = {
  status: 0,
  timestamp: '',
  mensagem: '',
  erro: null,
  errors: undefined,
  dados: undefined,
  success: undefined,
};

export function alterarUsuario() {}

export function excluirUsuario() {}

export default function SalvarUsuarioForm() {
  const [state, action, isPending] = useActionState(salvarUsuarioAction, initState);
  const form = useForm<z.infer<typeof UsuarioSchema>>({
    resolver: zodResolver(UsuarioSchema),
    defaultValues: {
      username: '',
      email: '',
    },
  });

  function onSubmit(data: UsuarioCreate) {
    toast('You submitted the following values:', {
      description: (
        <pre className="mt-2 w-[320px] overflow-x-auto rounded-md bg-code p-4 text-code-foreground">
          <code>{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
      position: 'bottom-right',
      classNames: {
        content: 'flex flex-col gap-2',
      },
      style: {
        '--border-radius': 'calc(var(--radius)  + 4px)',
      } as React.CSSProperties,
    });

    startTransition(() => {
      action({
        usuarioRequest: data,
        url: 'usuario',
      });
    });
  }

  return (
    <Card className="w-full sm:max-w-md">
      <CardHeader>
        <CardTitle>Cadastro de Usuario</CardTitle>
        <CardDescription>Informe os dados do usuario</CardDescription>
      </CardHeader>
      <CardContent>
        <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="username"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-title">Username</FieldLabel>
                  <Input
                    {...field}
                    id="form-rhf-demo-title"
                    aria-invalid={fieldState.invalid}
                    placeholder="Digite seu username"
                    autoComplete="off"
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-description">Email</FieldLabel>
                  <Input
                    {...field}
                    id="form-rhf-demo-description"
                    placeholder="seu.email@gmail.com"
                    aria-invalid={fieldState.invalid}
                  />
                  <FieldDescription>Digite seu email.</FieldDescription>
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter>
        <Field orientation="horizontal">
          <Button type="button" variant="outline" onClick={() => form.reset()}>
            Reset
          </Button>
          <Button type="submit" form="form-rhf-demo">
            Salvar
          </Button>
        </Field>
      </CardFooter>
    </Card>
  );
}
