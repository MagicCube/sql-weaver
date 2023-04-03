export class QueryStore {
  query = 'SELECT * FROM Customers';
  results: unknown[] = [];

  setQuery(query: string) {
    this.query = query;
  }

  async executeQuery() {
    const res = await fetch('/api/sqlite/northwind/query', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query: this.query }),
    });
    const results = await res.json();
    this.results = results;
  }
}
