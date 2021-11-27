import { gql } from 'apollo-server-express'

export const typeDefs = gql`
    type Query {
        requiredForSchema: Boolean
    }
    
    type Mutation {
        sendTimeslotUpdate(input: SendTimeslotUpdateInput!): String!
    }

    type Subscription {
        timeslotUpdated: TimeslotUpdate!
    }

    type TimeslotUpdate {
        timeslotId: Int!
        capacityAvailable: Int!
        capacityUsed: Int!
    }

    input SendTimeslotUpdateInput {
        timeslotId: Int!
        capacityAvailable: Int!
        capacityUsed: Int!
    }
`
