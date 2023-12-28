//@ts-ignore
import Layer from 'express/lib/router/layer';
//@ts-ignore
import Router from 'express/lib/router';

const getLastElement = (arr = []) => arr[arr.length - 1];
const noop = Function.prototype;

function copyFunctionProperties(oldFn: any, newFn: any) {
  Object.keys(oldFn).forEach((key) => {
    newFn[key] = oldFn[key];
  });
  return newFn;
}

function wrapMiddleware(fn: any) {
  const wrappedFn = function newMiddleware(...args: any) {
    //@ts-ignore
    const result = fn.apply(this, args);
    const nextMiddleware =
      (args.length === 5 ? args[2] : getLastElement(args)) || noop;
    if (result && result.catch) result.catch((err: any) => nextMiddleware(err));
    return result;
  };
  Object.defineProperty(wrappedFn, 'length', {
    value: fn.length,
    writable: false,
  });
  return copyFunctionProperties(fn, wrappedFn);
}

function patchRouterParam() {
  const originalParam = Router.prototype.constructor.param;
  Router.prototype.constructor.param = function param(
    name: any,
    middleware: any,
  ) {
    middleware = wrapMiddleware(middleware);
    return originalParam.call(this, name, middleware);
  };
}

Object.defineProperty(Layer.prototype, 'handle', {
  enumerable: true,
  get() {
    return this.__handle;
  },
  set(middleware) {
    middleware = wrapMiddleware(middleware);
    this.__handle = middleware;
  },
});

patchRouterParam();
