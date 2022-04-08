export class Task {
  constructor(
    public desc: string,
    private _isDone = false,
    public readonly uuid: string = crypto.randomUUID(), // node14.17+
  ) {
  }

  public done() {
    this._isDone = true;
  }

  public unDone() {
    this._isDone = false;
  }

  get isDone() {
    return this._isDone;
  }
}
