import type { Context } from 'vm'
import type { GraphQLInput } from '@app-types/GraphQLInput'
import { pubSub } from '@app-graphql/pub-sub'
import { TimeslotUpdate } from '@app-types/TimeslotUpdate'
import { sendTimeslotUpdate } from '@app-graphql/mutations/send-timeslot-update'

export const resolvers = {
    Mutation: {
        sendTimeslotUpdate(
            _: undefined,
            { input }: GraphQLInput<TimeslotUpdate>,
            context: Context,
        ) {
            if (context.authScope !== process.env.AUTHENTICATION) {
                throw new Error('Unauthenticated')
            }

            return sendTimeslotUpdate(input)
        }
    },
    Subscription: {
        timeslotUpdated: {
            subscribe: () => pubSub.asyncIterator(['TIMESLOT_UPDATED']),
        },
    },
}
