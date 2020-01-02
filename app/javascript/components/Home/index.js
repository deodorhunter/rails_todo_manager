import React, {createRef} from 'react';
import Dashboard from '../Dashboard';
import AddTaskForm from '../AddTaskForm';
import UserInfo from '../UserInfo';
import { Query } from "react-apollo";
import {Me} from '../UserInfo/operations.graphql';
import { Redirect } from 'react-router-dom';
import {Grid, Ref, Rail, Sticky, Header, Image} from 'semantic-ui-react';
import Subscription from '../Subscription'; 

export default () => (
    <Query query={Me}>
        {({ data, loading, subscribeToMore }) => {
            console.log('porcamadonna',data, loading);
            const ref = createRef();
            if(loading) return 'Loading...'
            return(
                <div style={{backgroundColor: 'grey'}}>
                    {!data.me ?
                    <Redirect to="/login"/> 
                    : <div> 
                        <Grid centered columns={2}  >
                            {/* <Grid.Column width={3} style={{backgroundColor: 'gray'}} centered>
                                
                            </Grid.Column> */}
                            <Grid.Column width={16}>
                                
                                <Dashboard currentUser={data.me}/>   
                            </Grid.Column>
                        </Grid>
                        
                      </div>
                    }
                </div> 
        )}}
    </Query>
)
