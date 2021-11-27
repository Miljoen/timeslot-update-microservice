import type { Request } from 'express/ts4.0'
import { createServer } from 'http'
import express from 'express'
import { execute, subscribe } from 'graphql'
import { ApolloServer } from 'apollo-server-express'
import { SubscriptionServer } from 'subscriptions-transport-ws'
import { makeExecutableSchema } from '@graphql-tools/schema'
import dotenv from 'dotenv'
import { resolvers } from '@app-graphql/resolvers'
import { typeDefs } from '@app-graphql/schema'

dotenv.config()

main()

async function main(): Promise<void> {
    const app = express()
    const httpServer = createServer(app)

    const schema = makeExecutableSchema({ typeDefs, resolvers })
    const server = new ApolloServer({
        schema,
        context: ({ req }: { req: Request }) => ({
            authScope: req.headers.authorization,
        }),
    })

    await server.start()

    server.applyMiddleware({ app })

    SubscriptionServer.create(
        { schema, execute, subscribe },
        { server: httpServer, path: server.graphqlPath },
    )

    httpServer.listen(process.env.HTTP_PORT, () => {
        console.log(`🚀 HTTP server ready at :${process.env.HTTP_PORT}${server.graphqlPath}`)
        console.log(`🚀 Websocket server ready at :${process.env.HTTP_PORT}${server.graphqlPath}`)
    })
}
