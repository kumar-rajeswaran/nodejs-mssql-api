export default class CrudService<T extends object> {
  constructor(private tableName: string) {}

  create<K extends keyof T>(data: T) {
    const columns = Object.keys(data).map((col) => col);
    const placeholders = Object.keys(data).map((column) => `${data[column as K]}`);

    const query = `INSERT INTO ${this.tableName} (${columns.join(`, `)}) VALUES ('${placeholders.join(`', '`)}')`;
    console.log({ query });

    return query;
  }

  getAll() {
    const query = `SELECT * FROM ${this.tableName}`;
    return query;
  }

  findOne<K extends keyof T>(where: Partial<T>) {
    const conditions = Object.keys(where)
      .map((key) => `${key} = '${where[key as K]}'`)
      .join(" AND ");

    const query = `SELECT top 1 * FROM ${this.tableName} WHERE ${conditions}`;
    return query;
  }

  findMany<K extends keyof T>(where: Partial<T>) {
    const conditions = Object.keys(where)
      .map((key) => `${key} = '${where[key as K]}'`)
      .join(" AND ");

    const query = `SELECT * FROM ${this.tableName} WHERE ${conditions}`;

    return query;
  }

  update<K extends keyof T>(id: number, data: Partial<T>) {
    const updates = Object.keys(data)
      .map((key) => `${key} = '${data[key as K]}'`)
      .join("', '");

    const query = `UPDATE ${this.tableName} SET '${updates}' WHERE id = ${id}`;

    return query;
  }

  delete(id: number) {
    const query = `DELETE FROM ${this.tableName} WHERE id = ${id}`;

    return query;
  }

  raw(sqlQuery: string) {
    const query = `${sqlQuery}`;

    return query;
  }
}
