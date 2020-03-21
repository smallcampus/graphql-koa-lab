import * as path from "path";

const config = {
  jwt: {
    secret: process.env.jwtSecret ?? '28e0414b-9345-4f2b-b1d5-fb54cec00433',
  },
  mongo: {
    dbUrl: 'mongodb://localhost:27017',
    dbName: 'test'
  },
  graphql: {
    outputSchema: true,
    schemaOutputPath: path.resolve(__dirname, '../graphql/schema.graphql')
  },
  displayColors: true,
  port: 3300,
}

export default config
