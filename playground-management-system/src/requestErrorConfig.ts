import { RuntimeConfig } from '@umijs/max';

export const requestConfig: RuntimeConfig['request'] = {
  timeout: 10000,
  errorConfig: {
    errorHandler() {},
    errorThrower() {},
  },
  requestInterceptors: [],
  responseInterceptors: [],
};
