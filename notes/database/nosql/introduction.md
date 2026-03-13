# NOSQL Databases

- Designed for distributed data stores where very large scale of data storing needs(google, facebook).
- The NOSQL databases **doesn't have tables** but single document files.
- There are 4 general types which designed for specific usages,
  1. Key-Value Stores Databases - (Redis, Dynamo)
  2. Column-oriented Databases - (BigTable, Cassandra)
  3. Graph Databases - (Neo4J, OrientDB)
  4. Document Oriented Databases - (MongoDB, CouchDB)

|                      | Performance | Scalability     | Flexibility | Complexity | Functionality      |
| -------------------- | ----------- | --------------- | ----------- | ---------- | ------------------ |
| Key-Value Stores     | high        | high            | high        | none       | variable (none)    |
| Column Stores        | high        | high            | moderate    | low        | minimal            |
| Document Stores      | high        | variable (high) | high        | low        | variable (low)     |
| Graph Databases      | variable    | variable        | high        | high       | graph theory       |
| Relational Databases | variable    | variable        | low         | moderate   | relational algebra |
