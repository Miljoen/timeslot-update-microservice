import { pubSub } from '@app-graphql/pub-sub'
import { TimeslotUpdate } from '@app-types/TimeslotUpdate'

export const sendTimeslotUpdate = async (timeslotUpdate: TimeslotUpdate) => {
    await pubSub.publish('TIMESLOT_UPDATED', {
        timeslotUpdated: timeslotUpdate,
    })

    return 'Broadcast completed'
}
