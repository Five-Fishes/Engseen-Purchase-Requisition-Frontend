export class QueryParamsBuilder {
  private url: string;

  public static withUrl(url: string): QueryParamsBuilder {
    const sanitisedUrl = url.endsWith('/') ? url.substr(0, url.length - 1) : url;
    return new QueryParamsBuilder(sanitisedUrl);
  }

  public addParams(params: Object): QueryParamsBuilder;
  public addParams(params: QueryParamType, paramName: string): QueryParamsBuilder;
  public addParams(params: Object | QueryParamType, paramName?: string) {
    const paramsIsObject = params instanceof Object;

    if (paramName && !paramsIsObject) {
      this.url = `${this.url}${paramName}=${params}&`;
    }

    if (paramsIsObject) {
      const inferredParamNames = Object.keys(params);
      inferredParamNames.forEach((inferredParamName) => {
        const paramValue: any = (params as any)[inferredParamName];
        if(paramValue) {
          this.url = `${this.url}${inferredParamName}=${paramValue}&`;
        }
      });
    }

    return this;
  }

  public build(): string {
    const finalisedUrl = this.url.endsWith('&') ? this.url.substr(0, this.url.length - 1) : this.url;
    return finalisedUrl;
  }

  constructor(url: string) {
    this.url = `${url}?`;
  }
}

type QueryParamType = string | Date | number | boolean | null | QueryParamType[];
