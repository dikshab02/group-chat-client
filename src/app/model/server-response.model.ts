export class ServerResponse<T> {
  constructor(
    public isError: boolean,
    public message: string,
    public data: T
  ) { }
}
