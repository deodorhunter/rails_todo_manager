import React, {createRef} from 'react';
import { Query } from 'react-apollo';
// import {AllTasksQuery} from './operations.graphql';
import './style.css';
import {Image, List, Grid, Label, Icon, Button, Header, Placeholder, Rail, Sticky, Ref} from 'semantic-ui-react';


export default ({query, currentUser}) => (
    <Query query={query.query} variables={query.variables}>
    {({ data, loading }) => {
        const ref = createRef();
        console.log(data, loading);
        return(
            <div>
              <Grid textAlign='left'>
                <Grid.Column style={{padding: '20px'}} className='container' width={10}>
                  <List divided relaxed size={'massive'}>
                      {loading
                        ? (
                            // <Segment loading>
                                <Placeholder>
                                    <Placeholder.Header image>
                                    <Placeholder.Line />
                                    <Placeholder.Line />
                                    </Placeholder.Header>
                                </Placeholder>
                            // </Segment>
                        )
                        : data[query.key].map((
                          { value, id, owner, overdue, assignee, completed, category }) => {
                            const contextAssignee = assignee ? (assignee.id === currentUser.id 
                              ? 'You' 
                              : assignee.username)
                              : null;
                            return(     
                              <List.Item key={id} verticalAlign='middle'>
                                <List.Icon name='tasks' size='large' verticalAlign='middle' color={ completed ? 'green': 'red'}/>
                                <List.Content verticalAlign='middle'>
                                  <List.Header as='h2' size='huge'>{value}</List.Header>
                                  <List.Description className="content">created by {' '}{owner.username}</List.Description>
                                  {/* <List.Content floated='right' verticalAlign='middle'> */}
                                    {!completed ? 
                                        <Button positive floated='right'
                                            content='Done' icon='checkmark' labelPosition='right'
                                        />
                                      : ''}  
                                  {/* </List.Content> */}
                                  <div style={{justifyContent: 'space-evenly'}}>
                                    {/* <span className='metatag'> */}
                                        {category ? 
                                        <Label className='metatag'>
                                            <Icon name="tag"/>{category}
                                        </Label>
                                        : ''}
                                    {/* </span> */}
                                    {/* <span className='metatag'> */}
                                        {overdue ? 
                                        <Label className='metatag'>
                                            <Icon name="calendar check outline"/>{overdue}
                                        </Label>
                                        : ''}
                                    {/* </span> */}
                                    {/* <span className='metatag'> */}
                                        {contextAssignee ? 
                                        <Label image className='metatag'>
                                            <img src='https://react.semantic-ui.com/images/avatar/small/joe.jpg' />
                                            @{contextAssignee}
                                        </Label>
                                        : ''}
                                    {/* </span> */}
                                  </div>  
                                  
                                </List.Content>
                              </List.Item>     
                          )}  
                        )}
                  </List>
                </Grid.Column>
                <Grid.Column>
                    <Ref innerRef={ref}>
                    <Rail position='right'>
                        <Sticky context={ref}>
                        <Header as='h3'>This will be home of task detail (and timer start? what does distraction free view mean?)</Header>
                        <Image src='https://react.semantic-ui.com/images/wireframe/image.png' />
                        </Sticky>
                    </Rail>
                    </Ref>
                </Grid.Column>
              </Grid>
                
                   
            </div>
    )}}
  </Query>
)