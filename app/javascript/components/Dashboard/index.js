// app/javascript/components/Library/index.js
import React, {useState} from 'react';
import { Query } from 'react-apollo';
import {AllTasksQuery, OwnedTasksQuery, AssignedTasksQuery} from './operations.graphql';
// import './style.css';
import {Tab} from 'semantic-ui-react';
import TaskTab from '../TaskTab';


export default ({currentUser}) => {
  // const [activeIndex, setActiveIndex] = useState(0);
  const panes = [
    { 
      menuItem: 'Tab 1', 
      render: () => (
        <Tab.Pane>
          All
          <TaskTab query={{
              key: 'allUserTasks',
              query: AllTasksQuery,
              variables:{
                'userId': currentUser.id
              }
            }}
            currentUser={currentUser}
          />
        </Tab.Pane>
      )
    },
    { 
      menuItem: 'Tab 2', 
      render: () => (
        <Tab.Pane>
          Added by you
          <TaskTab query={{
              key: 'ownedTasks',
              query: OwnedTasksQuery,
              variables:{
                'ownerId': currentUser.id
              }
            }}
            currentUser={currentUser}
          />
        </Tab.Pane>
      )
    },
    { 
      menuItem: 'Tab 3', 
      render: () => (
        <Tab.Pane>
          Assigned to you
          <TaskTab query={{
              key: 'assignedTasks',
              query: AssignedTasksQuery,
              variables:{
                'assigneeId': currentUser.id
              }
            }}
            currentUser={currentUser}
          />
        </Tab.Pane>
      )
    },
  ]
  // handleRangeChange = (e) => this.setState({ activeIndex: e.target.value })
  // handleTabChange = (e, { activeIndex }) => this.setState({ activeIndex })

  return (
    <Tab panes={panes} />
  );
}