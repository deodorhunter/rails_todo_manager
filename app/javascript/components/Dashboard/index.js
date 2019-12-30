// app/javascript/components/Library/index.js
import React, {useState} from 'react';
import AddTaskForm from '../AddTaskForm';
import {AllTasksQuery, OwnedTasksQuery, AssignedTasksQuery} from './operations.graphql';
import './style.css';
import {Tab, Header, Menu, Segment, Container} from 'semantic-ui-react';
import TaskTab from '../TaskTab';
import UserInfo from '../UserInfo';

export default ({currentUser}) => {
  const [activeTab, setActiveTab] = useState('all');
  
  const renderSegment = () => {
    let query = {};
    let header = '';
    if(activeTab === 'all'){
      header = 'All';
      query = {
        key: 'allUserTasks',
        query: AllTasksQuery,
        variables:{
          'userId': currentUser.id
        }
      }
    }
    else if(activeTab === 'owned'){
      header = 'Added by you';
      query = {
        key: 'ownedTasks',
        query: OwnedTasksQuery,
        variables:{
          'ownerId': currentUser.id
        }
      }
    }
    else if(activeTab === 'assigned'){
      header = 'Assigned to you';
      query = {
        key: 'assignedTasks',
        query: AssignedTasksQuery,
        variables:{
          'assigneeId': currentUser.id
        }
      }
    }
    return(
      <div>
        <Header as='h1'>{header}</Header>
          <TaskTab query={query}
            currentUser={currentUser}
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
          {renderSegment()}
      </div>
    </div>
    // <Tab panes={panes} />
  );
}