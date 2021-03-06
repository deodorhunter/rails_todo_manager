import React, {createRef} from 'react';
import { Query } from 'react-apollo';
// import {AllTasksQuery} from './operations.graphql';
import './style.css';
import {Image, List, Grid, Label, Icon, Button, Header, Placeholder, Rail, Sticky, Ref, Divider} from 'semantic-ui-react';
import ListItem from '../ListItem';
import Subscription from '../Subscription';



export default ({data, loading, currentUser, query, toggleTaskDetail}) => {
    const ref = createRef();
    console.log('[TaskTab] rendering with data ', data);
    const selectTask = (id) =>{
      console.log('[TaskTab] about to call details for task :', data.find(task => task.id === id))
      toggleTaskDetail(data.find(task => task.id === id))
    }
    return(
        <div style={{marginTop: '10px'}}>
         
                <div>
                <List relaxed size={'massive'} selection animated>
                  {(loading || !data)
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
                      { value, id, owner, overdue, assignees, completed, category }, index) => {
                        // TODO: sistemare
                        // if(assignees){
                        //   if(assignees.some(ass => ass.id === currentUser.id))
                        //     assignee.username='You'
                        // }
                        return(
                          <div key={id}>
                            <ListItem 
                              assignees={assignees} 
                              owner={owner} 
                              overdue={overdue}
                              value={value} 
                              completed={completed} 
                              category={category}
                              id={id}
                              currentUser={currentUser}
                              context={query}
                              selectTask={selectTask}
                            />
                            <Divider hidden style={{margin: '8px'}}/>     
                          </div>       
                      )}  
                    )}
                </List>
                </div>
          
          {/* <Grid textAlign='left' columns={3} centered> */}
            {/* <Grid.Column> */}
              
            {/* </Grid.Column> */}
            {/* <Grid.Column style={{padding: '0px'}} className='container'  */}
                {/* width={9} */}
            {/* > */}
              {/* <Ref innerRef={ref}> */}
                {/* <Rail dividing position='left'> */}
                    {/* <Sticky context={ref}> */}
                    {/* <Header as='h3'>This will be home of statistics and reports</Header> */}
                    {/* <Image src='https://react.semantic-ui.com/images/wireframe/image.png' /> */}
                    {/* </Sticky> */}
                {/* </Rail> */}
              {/* </Ref> */}
              
            {/* </Grid.Column> */}
            {/* <Grid.Column> */}
                {/* <Ref innerRef={ref}>
                <Rail position='right' >
                    <Sticky context={ref}>
                    <Header as='h3'>This will be home of task detail (and timer start? what does distraction free view mean?)</Header>
                    <Image src='https://react.semantic-ui.com/images/wireframe/image.png' />
                    </Sticky>
                </Rail>
                </Ref>
            </Grid.Column>
          </Grid>   */}
        </div>
    )
}
