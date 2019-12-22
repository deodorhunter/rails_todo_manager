// app/javascript/components/Library/index.js
import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

const Dashboard = gql`
  {
    tasks {
      id
      value
      category
      assignee
      overdue
      user {
        username
      }
    }
  }
`;

export default () => (
  <Query query={Dashboard}>
    {({ data, loading }) => {
        console.log(data, loading);
        return(
            <div>
                {loading
                ? 'loading...'
                : data.tasks.map(({ value, id, user, overdue, assignee }) => (
                    <div key={id}>
                        <h3>
                            <b>{value}</b>
                        </h3> 
                        <span>{user ? `added by ${user.username}` : null}</span>
                        <span>{overdue ? `expires on ${overdue}` : null}</span>
                        <span>{assignee && assignee.length !== 0 ? `assigned to ${assignee.toString()}` : null}</span>
                    </div>
                    ))}
            </div>
    )}}
  </Query>
);