export class QueryStore {
  query = 'SELECT * FROM Customers';
  results: unknown[] = [];
  error: Error | null = null;

  setQuery(query: string) {
    this.query = query;
  }

  async executeQuery() {
    this.error = null;
    try {
      const res = await fetch('/api/sqlite/northwind/query', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: this.query }),
      });
      const results = await res.json();
      this.results = results;
    } catch (e) {
      this.error = e as Error;
      this.results = [];
    }
  }
}
