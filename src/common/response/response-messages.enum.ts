export enum ResponseMessages {
  SUCCESS = 'success',
  UNEXPECTED_ERROR = 'be-error.unexpected',
  PARAMETER_REQUIRED = 'be-error.required',
  PARAMETER_SHOULD_BE_STRING = 'be-error.parameter.shouldBeString',
  PARAMETER_SHOULD_BE_NUMBER = 'be-error.parameter.shouldBeNumber',
  PARAMETER_SHOULD_BE_ARRAY = 'be-error.parameter.shouldBeArray',
  PARAMETER_SHOULD_BE_VALID = 'be-error.parameter.shouldBeValid',
  PARAMETER_SHOULD_BE_BOOLEAN = 'be-error.parameter.shouldBeBoolean',
  PARAMETER_MIN_ERROR = 'be-error.parameter.minError',
  PARAMETER_MAX_ERROR = 'be-error.parameter.maxError',
  NOTIFICATION_NOT_FOUND = 'be-error.notFound.notification',
}
