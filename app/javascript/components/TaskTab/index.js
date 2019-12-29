import React from 'react';
import { Query } from 'react-apollo';
// import {AllTasksQuery} from './operations.graphql';
import './style.css';
import {Container, List, Grid, Label, Icon, Button} from 'semantic-ui-react';


export default ({query, currentUser}) => (
    <Query query={query.query} variables={query.variables}>
    {({ data, loading }) => {
        
        console.log(data, loading);
        return(
            <Container>
              <Grid textAlign='left'>
                <Grid.Column style={{ maxWidth: 800, padding: 20}}>
                  <List divided relaxed size={'massive'}>
                      {loading
                        ? 'loading...'
                        : data[query.key].map(({ value, id, owner, overdue, assignee, completed }) => {
                            const contextAssignee = assignee ? (assignee.id === currentUser.id 
                              ? 'You' 
                              : assignee.username)
                              : null;
                            return(     
                              <List.Item key={id}>
                                <List.Content floated='right'>
                                  <Button>Do</Button>
                                </List.Content>
                                <List.Icon name='tasks' size='large' verticalAlign='middle' color={ completed ? 'green': 'red'}/>
                                <List.Content verticalAlign='middle'>
                                  <List.Header as='h2' size='huge'>{value}</List.Header>
                                  <List.Description className="content">created by {' '}{owner.username}</List.Description>
                                
                                  <span className='metatag'>
                                    {overdue ? 
                                      <Label>
                                        <Icon name="calendar check outline"/>{overdue}
                                      </Label>
                                      : ''}
                                  </span>
                                  <span className='metatag'>
                                    {contextAssignee ? 
                                      <Label image>
                                        <img src='https://react.semantic-ui.com/images/avatar/small/joe.jpg' />
                                        @{contextAssignee}
                                      </Label>
                                      : ''}
                                  </span>
                                </List.Content>
                              </List.Item>     
                          )}  
                        )}
                  </List>
                </Grid.Column>
              </Grid>
                
                   
            </Container>
    )}}
  </Query>
)