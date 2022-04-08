export class Task {
  public readonly desc: string;

  constructor(
    desc: string,
    private _isDone = false,
    // public readonly uuid: string = crypto.randomUUID(), // node14.17+
    public readonly id: number = +crypto.getRandomValues(new Uint32Array(10)).join()
  ) {
    if (!desc || desc.trim().length === 0) {
      throw new Error('Invalid task value')
    }
    this.desc = desc.trim();
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
