interface IRepository<T = unknown> {
  find(id: number): Promise<T | null>;
  findAll(): Promise<T[]>;
  create(payload: unknown): Promise<T>;
  update(): Promise<T>;
  delete(): Promise<boolean>;
}

export { type IRepository };
