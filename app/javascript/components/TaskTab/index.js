import React, {createRef} from 'react';
import { Query } from 'react-apollo';
// import {AllTasksQuery} from './operations.graphql';
import './style.css';
import {Image, List, Grid, Label, Icon, Button, Header, Placeholder, Rail, Sticky, Ref, Divider} from 'semantic-ui-react';


export default ({data, loading, currentUser}) => {
    const ref = createRef();
    console.log(data, loading);
    return(
        <div>
          
          <Grid textAlign='left' columns={3} centered>
            {/* <Grid.Column> */}
              
            {/* </Grid.Column> */}
            <Grid.Column style={{padding: '0px'}} className='container' 
                width={9}
            >
              <Ref innerRef={ref}>
                <Rail dividing position='left'>
                    <Sticky context={ref}>
                    <Header as='h3'>This will be home of statistics and reports</Header>
                    <Image src='https://react.semantic-ui.com/images/wireframe/image.png' />
                    </Sticky>
                </Rail>
              </Ref>
              <List relaxed size={'massive'}>
                  {!data
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
                    : data.map((
                      { value, id, owner, overdue, assignee, completed, category }, index) => {
                        const contextAssignee = assignee ? (assignee.id === currentUser.id 
                          ? 'You' 
                          : assignee.username)
                          : null;
                        return(
                          <div>
                            <List.Item key={id} verticalAlign='middle' style={{backgroundColor: 'white', paddingTop: '10px'}}>
                              <div style={{display: 'flex', padding: '10px'}}>
                                <List.Icon name='tasks' size='large' verticalAlign='middle' color={ completed ? 'green': 'red'} style={{paddingLeft: '10px'}} />
                                  <List.Content verticalAlign='middle' style={{flex: 1, paddingBottom: '0px'}}>
                                    <List.Header as='h2' size='huge' style={{margin: 'auto'}}>{value}</List.Header>
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
                              </div>
                              
                            </List.Item>
                            <Divider hidden style={{margin: '8px'}}/>     
                          </div>       
                      )}  
                    )}
              </List>
            {/* </Grid.Column> */}
            {/* <Grid.Column> */}
                <Ref innerRef={ref}>
                <Rail position='right' >
                    <Sticky context={ref}>
                    <Header as='h3'>This will be home of task detail (and timer start? what does distraction free view mean?)</Header>
                    <Image src='https://react.semantic-ui.com/images/wireframe/image.png' />
                    </Sticky>
                </Rail>
                </Ref>
            </Grid.Column>
          </Grid>  
        </div>
    )
}
