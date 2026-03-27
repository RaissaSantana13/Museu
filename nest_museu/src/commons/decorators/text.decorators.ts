import { IsEmail, IsNotEmpty, IsString, Matches, MaxLength, MinLength } from 'class-validator';
import { FIELD_LABEL_KEY } from './fields.metadata';

export type Gender = 'm' | 'f';

export interface FieldOptions {
  required?: boolean;
  min?: number;
  max?: number;
  label?: string;
  gender?: Gender;
  email?: boolean;
  regex?: RegExp;
}

export function TextField(options: FieldOptions): PropertyDecorator {
  return (target, propertyKey) => {
    const fieldName = propertyKey as string;
    const label = options.label ?? fieldName;
    const gender = options.gender ?? 'm';
    const entity = getEntityName(target);

    const art = article(gender);
    Reflect.defineMetadata(FIELD_LABEL_KEY, label, target, propertyKey);

    IsString({
      message: `${art} ${label} do ${entity} deve ser um texto`,
    })(target, propertyKey);

    if (options.required) {
      IsNotEmpty({
        message: `${art} ${label} do ${entity} deve obrigatorio`,
      })(target, propertyKey);
    }

    if (options.min) {
      MinLength(options.min, {
        message: `${art} ${label} do ${entity} deve conter no minimo ${options.min} caracteres`,
      })(target, propertyKey);
    }

    if (options.max) {
      MaxLength(options.max, {
        message: `${art} ${label} do ${entity} deve conter no minimo ${options.max} caracteres`,
      })(target, propertyKey);
    }

    if (options.email) {
      IsEmail(
        {},
        {
          message: `${art} ${label} do ${entity} deve ser um email valido`,
        },
      )(target, propertyKey);
    }

    if (options.regex) {
      Matches(options.regex, {
        message: `${art} ${label} do ${entity} nao atende ao formato esperado`,
      })(target, propertyKey);
    }
  };
}

function getEntityName(target: any): string {
  return target.constructor.entityName;
}

function article(gender: Gender = 'm'): string {
  return gender === 'f' ? 'A' : 'O';
}
