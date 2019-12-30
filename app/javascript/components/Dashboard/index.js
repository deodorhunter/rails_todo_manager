// app/javascript/components/Library/index.js
import React, {useState} from 'react';
import { Query } from 'react-apollo';
import {AllTasksQuery, OwnedTasksQuery, AssignedTasksQuery} from './operations.graphql';
// import './style.css';
import {Tab, Header, Menu, Segment, Container} from 'semantic-ui-react';
import TaskTab from '../TaskTab';


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
      <Menu pointing secondary size='massive'>
        <Menu.Item
          name='all'
          active={activeTab === 'all'}
          onClick={(e, { name }) => setActiveTab(name)}
        />
        <Menu.Item
          name='owned'
          active={activeTab === 'owned'}
          onClick={(e, { name }) => setActiveTab(name)}
        />
        <Menu.Item
          name='assigned'
          active={activeTab === 'assigned'}
          onClick={(e, { name }) => setActiveTab(name)}
        />
        <Menu.Menu position='right'>
          <Menu.Item
            name='logout'
            active={activeTab === 'logout'}
            onClick={(e, { name }) => setActiveTab(name)}
          />
        </Menu.Menu>
      </Menu>

      <div>
          {renderSegment()}
      </div>
    </div>
    // <Tab panes={panes} />
  );
}