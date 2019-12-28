// app/javascript/components/Library/index.js
import React from 'react';
import { Query } from 'react-apollo';
import {AllTasksQuery} from './operations.graphql';
import {Me} from '../UserInfo/operations.graphql';



export default ({currentUser}) => (
  <Query query={AllTasksQuery} variables={{'userId': currentUser.id}}>
    {({ data, loading }) => {
        console.log(data, loading);
        return(
            <div>
                {loading
                ? 'loading...'
                : data.allUserTasks.map(({ value, id, owner, overdue, assignee }) => (
                    <div key={id}>
                        <h3>
                            <b>{value}</b>
                        </h3> 
                        <span>{owner ? `added by ${owner.username}` : null}</span>
                        <span>
                          {overdue ? `expires on ${ new Date(overdue).toUTCString()}` : null}
                        </span>
                        <span>{assignee ? `assigned to ${assignee.username}` : null}</span>
                    </div>
                    ))}
            </div>
    )}}
  </Query>
);