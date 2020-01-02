// app/javascript/components/Library/index.js
import React, {useState} from 'react';
import AddTaskForm from '../AddTaskForm';
import {AllTasksQuery, OwnedTasksQuery, AssignedTasksQuery} from './operations.graphql';
import './style.css';
import {Tab, Header, Menu, Segment, Container} from 'semantic-ui-react';
import TaskTab from '../TaskTab';
import UserInfo from '../UserInfo';
import { Query } from 'react-apollo';
import Subscription from '../Subscription';

export default ({currentUser}) => {
  const [activeTab, setActiveTab] = useState('all');
  const createContextData = (data) => {
    switch (activeTab) {
      case 'all':
        return data['allUserTasks']
        
      case 'owned':
        // console.log(data['allUserTasks'], data['allUserTasks'].filter( el => el.owner.id === currentUser.id) )
        return data['allUserTasks'].filter( el => {
          if(el.hasOwnProperty('owner') && el.owner) 
            return el.owner.id === currentUser.id
        })
        
      case 'assigned':
        return data['allUserTasks'].filter( el => {
          if(el.hasOwnProperty('assignee') && el.assignee)
           return el.assignee.id === currentUser.id
        })
      
      default:
        break;
    }
  }
  const renderSegment = (contextData, loading) => (
      <div>
        {/* <Header as='h1'>{header}</Header> */}
          <TaskTab data={contextData}
            currentUser={currentUser}
            loading={loading}
          />
      </div>
    // </Tab.Pane>
  )
  
  return (
    <div>
      <Menu pointing secondary size='massive' inverted color={'teal'}
          style={{alignItems: 'center'}}
      >
        <Menu.Item
          name='all'
          active={activeTab === 'all'}
          onClick={(e, { name }) => setActiveTab(name)}
          style={{fontSize: '24px'}}
          // className='ui menu item'
        />
        <Menu.Item
          name='owned'
          active={activeTab === 'owned'}
          onClick={(e, { name }) => setActiveTab(name)}
          style={{fontSize: '24px'}}
          // className='ui menu item'
        />
        <Menu.Item
          name='assigned'
          active={activeTab === 'assigned'}
          onClick={(e, { name }) => setActiveTab(name)}
          style={{fontSize: '24px'}}
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
        <Query query={AllTasksQuery} variables={{'userId': currentUser.id}}>
          {({ data, loading, subscribeToMore }) => {
            console.log(data, loading)
            const contextData = data && !loading ? createContextData(data) : null;
            return(
              <div>
                  {contextData ? renderSegment(contextData, loading) : ''}
                  <Subscription subscribeToMore={subscribeToMore}/>
              </div>
            )
          }}
        
        </Query>
         
      </div>
    </div>
    // <Tab panes={panes} />
  );
}