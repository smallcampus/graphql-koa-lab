import { ApolloServer } from 'apollo-server-koa'
import { buildSchema } from 'type-graphql'
import {ProjectResolvers} from "../resolvers/projectResolver";
import config from "../config";

export default async () => {
  const schema = await buildSchema({
    resolvers: [
        ProjectResolvers
    ],
    emitSchemaFile: config.graphql.outputSchema?config.graphql.schemaOutputPath:undefined,
  })

  const server = new ApolloServer({ schema })

  console.info(`Registering graphql on ${server.graphqlPath}`)

  return server.getMiddleware()
}
