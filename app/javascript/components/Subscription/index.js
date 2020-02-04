// /app/javascript/components/Subscription/index.js
import React, { useEffect } from 'react';
import { TaskSubscription } from './operations.graphql';
import { useApolloClient } from "@apollo/react-hooks";

const Subscription = ({ subscribeToMore }) => {
    // console.log(subscribeToMore)
    // debugger
  //   const client = useApolloClient();
  //   console.log(client);
  // // TODO: also update statistics query  
  // const cacheUpdate = (context, operation) => {
  //   const {queriesToUpdate, newData, prev} = context;
  //   let result = { prev }
  //   if(operation === 'taskAdded'){
  //     console.log('[Subscription:cacheUpdate] taskAdded: updating queries ', queriesToUpdate)
  //     for( const query of queriesToUpdate){
  //       if(!query.cachedData)
  //         continue
  //       const alreadyInList = query.cachedData.find(e => e.id === newData.id);
  //       if(!alreadyInList){
  //         result = {
  //           ...result,
  //           [query.operationName]: [newData, ...query.cachedData]
  //         }
  //       }
  //     }
  //   }
  //   else if(operation === 'taskCompleted'){
  //     console.log('[Subscription:cacheUpdate] taskCompleted: updating queries ', queriesToUpdate)
  //     for( const query of queriesToUpdate){
  //       if(!query.cachedData)
  //         continue
  //       const updatedTasks = [...query.cachedData];
         
  //       updatedTasks[updatedTasks.findIndex( el => el.id === query.newData.id)] = query.newData;
  //       result = {
  //         ...result,
  //         [query.operationName]: updatedTasks
  //       }
  //     }
  //   }
  //   return result;
  // }
  // const updateApolloCache = (prev, data, operation) => {
  //   const user = prev.me;
  //   let context = {
  //     newData: data,
  //     prev
  //   };
  //   if( data.owner === user.id ){
  //     // probably just refetch all and owned
  //     // TODO: verify that's working also with taskCompleted subscription
  //     context = {
  //       ...context,
  //       queriesToUpdate: [
  //         {
  //           cachedData: prev['allUserTasks'],
  //           operationName: 'allUserTasks'
  //         },
  //         {
  //           cachedData: prev['ownedTasks'],
  //           operationName: 'ownedTasks'
  //         }
  //       ],
       
  //     }
     
  //   }
  //   else{
  //     if(data.assignees.find(el => el.id === user.id)){
  //       // probably just refetch all and assigned
  //       // TODO: verify that's working also with taskCompleted subscription
  //       context = {
  //         ...context,
  //         queriesToUpdate: [
  //           {
  //             cachedData: prev['allUserTasks'],
  //             operationName: 'allUserTasks'
  //           },
  //           {
  //             cachedData: prev['assignedTasks'],
  //             operationName: 'assignedTasks'
  //           }
  //         ]
  //       }
  //     }
  //   }
  //   debugger
  //   return cacheUpdate(context, operation)

  // }  
  console.log('[TaskSubscription]')
  useEffect(() => {
      // debugger
    return subscribeToMore({
      document: TaskSubscription,
      updateQuery: (prev, { subscriptionData }) => {
        debugger
        if (!subscriptionData.data) return prev;
        const { taskAdded, taskCompleted, taskDeleted } = subscriptionData.data;
        console.log('[TaskSupscription] : ',prev, subscriptionData, taskAdded, taskCompleted, taskDeleted)
        if (taskAdded) {
          debugger  
          // return updateApolloCache(prev, taskAdded, 'taskAdded');
          const alreadyInList = prev.allUserTasks.find(e => e.id === taskAdded.id);
          if (alreadyInList) {
            return prev;
          }

          return { ...prev, allUserTasks: [taskAdded, ...prev.allUserTasks] };
        }
        else if(taskCompleted){
          debugger
          // return updateApolloCache(prev, taskCompleted, 'taskCompleted');
          const updatedTasks = [...prev.allUserTasks];
         
          updatedTasks[updatedTasks.findIndex( el => el.id === taskCompleted.id)] = taskCompleted;
          console.log(updatedTasks, prev.allUserTasks)
          return {
            ...prev,
            allUserTasks: updatedTasks
          }
        }
        else if(taskDeleted){
          debugger
          const updatedTasks = [...prev.allUserTasks].filter( task => task.id !== taskDeleted.id );
          return{
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