import { QueryParamsBuilder } from './query-params-builder';

test('query params builder: inferred param name', () => {
  const baseUrl = 'http://www.abc.com/api';
  const firstName: string = 'LU';
  const lastName: string = 'XIANZE';
  const paramsWrapper = { firstName, lastName };
  const resultingUrl: string = QueryParamsBuilder.withUrl(baseUrl).addParams(paramsWrapper).build();
  expect(resultingUrl).toBe(`${baseUrl}?firstName=${firstName}&lastName=${lastName}`);
});

test('string type is not object', () => {
  const str: any = 'abc';
  expect(str instanceof Object).toBe(false);
});
