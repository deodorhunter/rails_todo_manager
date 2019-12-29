import React from 'react';
import Dashboard from '../Dashboard';
import AddTaskForm from '../AddTaskForm';
import UserInfo from '../UserInfo';
import { Query } from "react-apollo";
import {Me} from '../UserInfo/operations.graphql';
import { Redirect } from 'react-router-dom';

export default () => (
    <Query query={Me}>
        {({ data, loading }) => {
            console.log('porcamadonna',data, loading)
            if(loading) return 'Loading...'
            return(
                <div>
                    {!data.me ?
                    <Redirect to="/login"/> 
                    : <div> 
                        <UserInfo currentUser={data.me}/>
                        <AddTaskForm currentUser={data.me}/>
                        <Dashboard currentUser={data.me}/>   
                      </div>
                    }
                </div> 
        )}}
    </Query>
)
