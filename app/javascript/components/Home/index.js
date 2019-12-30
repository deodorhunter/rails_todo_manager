import React, {createRef} from 'react';
import Dashboard from '../Dashboard';
import AddTaskForm from '../AddTaskForm';
import UserInfo from '../UserInfo';
import { Query } from "react-apollo";
import {Me} from '../UserInfo/operations.graphql';
import { Redirect } from 'react-router-dom';
import {Grid, Ref, Rail, Sticky, Header, Image} from 'semantic-ui-react';

export default () => (
    <Query query={Me}>
        {({ data, loading }) => {
            console.log('porcamadonna',data, loading);
            const ref = createRef();
            if(loading) return 'Loading...'
            return(
                <div>
                    {!data.me ?
                    <Redirect to="/login"/> 
                    : <div> 
                        <Grid centered columns={2}>
                            <Grid.Row>
                                <UserInfo currentUser={data.me}/>
                            </Grid.Row>
                            <Grid.Column width={3}>
                                <Ref innerRef={ref}>
                                    <Rail>
                                        <Sticky context={ref}>
                                        <Header as='h3'>This will be home of statistics and reports</Header>
                                        <Image src='https://react.semantic-ui.com/images/wireframe/image.png' />
                                        </Sticky>
                                    </Rail>
                                </Ref>
                            </Grid.Column>
                            <Grid.Column width={12}>
                                {'below will go somewere else, above will be something else'}
                                <AddTaskForm currentUser={data.me}/>
                                <Dashboard currentUser={data.me}/>   
                            </Grid.Column>
                        </Grid>
                        
                      </div>
                    }
                </div> 
        )}}
    </Query>
)
