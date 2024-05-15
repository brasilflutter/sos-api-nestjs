import { ROUTE_ARGS_METADATA } from '@nestjs/common/constants'

/* istanbul ignore next */
export function getParamDecoratorFactory(decorator: any) {
  class Test {
    public test(@decorator() value: any) {
      return value
    }
  }

  const args = Reflect.getMetadata(ROUTE_ARGS_METADATA, Test, 'test')
  return args[Object.keys(args)[0]].factory
}
