export class QueryStore {
  query = 'SELECT * FROM Customers';

  setQuery(query: string) {
    this.query = query;
  }

  executeQuery() {}
}
