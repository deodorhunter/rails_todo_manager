import React, { useEffect } from 'react';
import { TimeEntriesSubscription } from './operations.graphql';


const TimeSubscription = ({ subscribeToMore }) => {
    console.log('porcodio')
  useEffect(() => {
    // debugger
    return subscribeToMore({
        document: TimeEntriesSubscription,
        updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        const { timeAdded } = subscriptionData.data;
        console.log('[TimeSubscription] ',prev, subscriptionData, timeAdded)
        if(timeAdded){
            debugger
            
            console.log('[TimeSubscription:test]', [...prev.taskTimeDetails.timeEntries, timeAdded])
            const newTaskTimeDetails = {
              ...prev.taskTimeDetails,
              timeEntries: [...prev.taskTimeDetails.timeEntries, timeAdded]
            }
            console.log('[TimeSubscription:timeAdded] ',newTaskTimeDetails)
            return{
                ...prev,
                taskTimeDetails: newTaskTimeDetails
            }
        }
        return prev;
        },
    });
    }, []);
  return null;
};

export default TimeSubscription;