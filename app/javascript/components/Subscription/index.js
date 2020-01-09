// /app/javascript/components/Subscription/index.js
import React, { useEffect } from 'react';
import { TaskSubscription } from './operations.graphql';

const Subscription = ({ subscribeToMore }) => {
    // console.log(subscribeToMore)
    // debugger
  useEffect(() => {
    //   debugger
    return subscribeToMore({
      document: TaskSubscription,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        const { taskAdded, taskCompleted } = subscriptionData.data;
        console.log(prev, subscriptionData, taskAdded, taskCompleted)
        if (taskAdded) {
          debugger  
          const alreadyInList = prev.allUserTasks.find(e => e.id === taskAdded.id);
          if (alreadyInList) {
            return prev;
          }

          return { ...prev, allUserTasks: [taskAdded, ...prev.allUserTasks] };
        }
        else if(taskCompleted){
          debugger
          const updatedTasks = [...prev.allUserTasks];
         
          updatedTasks[updatedTasks.findIndex( el => el.id === taskCompleted.id)] = taskCompleted;
          console.log(updatedTasks, prev.allUserTasks)
          return {
            ...prev,
            allUserTasks: updatedTasks
          }
        }

        return prev;
      },
    });
  }, []);
  return null;
};

export default Subscription;