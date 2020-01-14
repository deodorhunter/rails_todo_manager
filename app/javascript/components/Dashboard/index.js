// app/javascript/components/Library/index.js
import React, {useState, createRef} from 'react';
import AddTaskForm from '../AddTaskForm';
import {AllTasksQuery, OwnedTasksQuery, AssignedTasksQuery} from './operations.graphql';
import {Grid, Ref, Menu, Rail, Sticky, Image, Header} from 'semantic-ui-react';
import TaskTab from '../TaskTab';
import UserInfo from '../UserInfo';
import { Query } from 'react-apollo';
import Subscription from '../Subscription';
import StatsRail from '../StatsRail';


export default ({currentUser}) => {
  const [activeTab, setActiveTab] = useState('ALL');
  const ref = createRef();
  // const createContextData = (data) => {
  //   switch (activeTab) {
  //     case 'ALL':
  //       return data['allUserTasks']
        
  //     case 'OWNED':
  //       // console.log(data['allUserTasks'], data['allUserTasks'].filter( el => el.owner.id === currentUser.id) )
  //       return data['allUserTasks'].filter( el => {
  //         if(el.hasOwnProperty('owner') && el.owner) 
  //           return el.owner.id === currentUser.id
  //       })
        
  //     case 'ASSIGNED':
  //       return data['allUserTasks'].filter( el => {
  //         if(el.hasOwnProperty('assignee') && el.assignee)
  //          return el.assignee.id === currentUser.id
  //       })
      
  //     default:
  //       break;
  //   }
  // }
  const renderSegment = () => {
    let queryObj = {}
    switch(activeTab){
      case 'ALL':
        queryObj = {
          ...queryObj,
          'query': AllTasksQuery,
          'variables': {
            'userId': currentUser.id
          }
        }
        break;
      case 'OWNED':
        queryObj = {
          ...queryObj,
          'query': OwnedTasksQuery,
          'variables': {
            'ownerId': currentUser.id
          }
        }
        break;
      case 'ALL':
        queryObj = {
          ...queryObj,
          'query': AssignedTasksQuery,
          'variables': {
            'assigneeId': currentUser.id
          }
        }
        break;
        
    }
    return (
      <div>
        {/* <Header as='h1'>{header}</Header> */}
          <TaskTab
          //  data={contextData}
            currentUser={currentUser}
            // loading={loading}
            query={queryObj}
          />
      </div>
    // </Tab.Pane>
    )
  }
  
  return (
    <div>
      <Menu pointing secondary size='massive' inverted color={'teal'}
          style={{alignItems: 'center'}}
      >
        <Menu.Item
          name='ALL'
          active={activeTab === 'ALL'}
          onClick={(e, { name }) => setActiveTab(name)}
          style={{fontSize: '20px'}}
          // className='ui menu item'
        />
        <Menu.Item
          name='OWNED'
          active={activeTab === 'OWNED'}
          onClick={(e, { name }) => setActiveTab(name)}
          style={{fontSize: '20px'}}
          // className='ui menu item'
        />
        <Menu.Item
          name='ASSIGNED'
          active={activeTab === 'ASSIGNED'}
          onClick={(e, { name }) => setActiveTab(name)}
          style={{fontSize: '20px'}}
          // className='ui menu item'
        />
        <Menu.Item style={{padding: '0px', margin: 'auto'}}>
          <AddTaskForm currentUser={currentUser}  />
        </Menu.Item>
        <Menu.Menu position='right' style={{padding: '0px', alignItems: 'center'}}>
          <Menu.Item style={{flex:0, padding: '0px'}}>
            <UserInfo currentUser={currentUser}/>
          </Menu.Item>
            {/* name='logout'
            active={activeTab === 'logout'}
            onClick={(e, { name }) => setActiveTab(name)}
            style={{fontSize: '24px'}}
            // className='ui menu item'
          /> */}
        </Menu.Menu>
      </Menu>

      <div>
        {/* <Query query={AllTasksQuery} variables={{'userId': currentUser.id}}> */}
          {/* {({ data, loading, subscribeToMore }) => { */}
            {/* console.log(data, loading) */}
            {/* const contextData = data && !loading ? createContextData(data) : null; */}
            {/* return( */}
              {/* <div> */}
                <Grid textAlign='left' columns={3} centered>
                  <Grid.Column style={{padding: '0px'}} className='container' 
                    width={9}>
                    <Ref innerRef={ref}>
                      <Rail dividing position='left' style={{width: '340px', padding: '0px', marginLeft: '35px', display: 'flex'}}>
                          <Sticky context={ref} style={{flex: 1}}>
                          <StatsRail currentUser={currentUser}/>
                          </Sticky>
                      </Rail>
                    </Ref>
                    {currentUser ? renderSegment() : ''}
                    <Subscription subscribeToMore={subscribeToMore}/>
                    <Ref innerRef={ref}>
                      <Rail position='right' style={{width: '340px', padding: '0px', marginLeft: '35px', marginRight: '35px', display: 'flex'}} >
                          <Sticky context={ref}>
                          <Header as='h3'>This will be home of task detail (and timer start? what does distraction free view mean?)</Header>
                          <Image src='https://react.semantic-ui.com/images/wireframe/image.png' />
                          </Sticky>
                      </Rail>
                      </Ref>
                  </Grid.Column>
                </Grid>  
              {/* </div> */}
            {/* ) */}
          {/* }} */}
        
        {/* </Query> */}
         
      </div>
    </div>
    // <Tab panes={panes} />
  );
}