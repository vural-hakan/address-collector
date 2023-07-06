import { ValidationError } from 'class-validator';
import { Catch, ExceptionFilter, HttpException } from '@nestjs/common';

@Catch(HttpException)
export class AllExceptionFilter implements ExceptionFilter {
  catch(exception: any) {
    const values = exception.getResponse().valueOf();

    const validationErrors = values['message'];
    if (
      Array.isArray(validationErrors) &&
      validationErrors[0] instanceof ValidationError
    ) {
      const errors = [];

      validationErrors.map((ve) => {
        if (ve.constraints) {
          for (const obj of Object.keys(ve.constraints)) {
            errors.push(ve.constraints[obj] + '.' + ve.property);
          }
        }

        if (Object.keys(ve.children).length) {
          const childErrors: any = [];
          ve.children.map((veChild: ValidationError, key: number) => {
            if (veChild.constraints) {
              for (const obj of Object.keys(veChild.constraints)) {
                childErrors.push(
                  veChild.constraints[obj] + '.' + veChild.property,
                );
              }
            } else {
              veChild.children.map(
                (child: ValidationError, childKey: number) => {
                  childErrors[key] = [];
                  for (const obj of Object.keys(child.constraints)) {
                    childErrors[key].push(
                      ve.children[key].children[childKey].constraints[obj] +
                        '.' +
                        ve.children[key].children[childKey].property,
                    );
                  }
                },
              );
            }
          });
          errors.push({ [ve.property]: childErrors });
        }
      });
      if (errors.length > 0) {
        exception.response.message = errors[0];
      } else {
        exception.response.message = errors;
      }
    }
    exception.response.service = process.env.APP_ENV;

    throw exception;
  }
}
