import React, { useEffect } from 'react';
import { StatSubscription } from './operations.graphql';


const TimeSubscription = ({ subscribeToMore }) => {
    console.log('porcodio')
//   useEffect(() => {
//     // debugger
//     return subscribeToMore({
//         document: StatSubscription,
//         updateQuery: (prev, { subscriptionData }) => {
//         if (!subscriptionData.data) return prev;
//         const { statsUpdate } = subscriptionData.data;
//         console.log('[StatsSubscription] ',prev, subscriptionData, statsUpdate)
//         if(statsUpdate){
//             debugger
//             console.log('[StatsSubscription:statsUpdate] ',prev)
//             return{
//                 ...prev,
//                 statistics: statsUpdate
//             }
//         }
//         return prev;
//         },
//     });
//     }, []);
  return null;
};

export default TimeSubscription;