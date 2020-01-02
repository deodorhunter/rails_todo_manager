// /app/javascript/components/Subscription/index.js
import React, { useEffect } from 'react';
import { TaskSubscription } from './operations.graphql';

const Subscription = ({ subscribeToMore }) => {
    console.log(subscribeToMore)
    debugger
  useEffect(() => {
    //   debugger
    return subscribeToMore({
      document: TaskSubscription,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        const { taskAdded } = subscriptionData.data;
        console.log(prev, subscriptionData, taskAdded)
        if (taskAdded) {
          debugger  
          const alreadyInList = prev.allUserTasks.find(e => e.id === taskAdded.id);
          if (alreadyInList) {
            return prev;
          }

          return { ...prev, allUserTasks: [taskAdded, ...prev.allUserTasks] };
        }

        return prev;
      },
    });
  }, []);
  return null;
};

export default Subscription;