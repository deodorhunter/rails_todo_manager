// app/javascript/components/Library/index.js
import React, {useState, createRef} from 'react';
import AddTaskForm from '../AddTaskForm';
import { useApolloClient } from "@apollo/react-hooks";
import {AllTasksQuery} from './operations.graphql';
import {UserStatistics} from '../StatsRail/operations.graphql';
import {TaskTimeEntries} from '../DetailsRail/operations.graphql';
import {Grid, Ref, Menu, Rail, Sticky, Image, Header} from 'semantic-ui-react';
import TaskTab from '../TaskTab';
import UserInfo from '../UserInfo';
import { Query } from 'react-apollo';
import Subscription from '../Subscription';
import StatsRail from '../StatsRail';
import StatsSubscription from '../StatsSubscription';
import StatsPage from '../StatsPage';
import DetailsRail from '../DetailsRail';


export default ({currentUser}) => {
  const [activeTab, setActiveTab] = useState('ALL');
  const [selectedTask, setSelectedTask] = useState(null);
  const ref = createRef();
  const client = useApolloClient();

  const createContextData = (data = null) => {
    switch (activeTab) {
      case 'ALL':
        return data['allUserTasks']
        
      case 'OWNED':
        return data['allUserTasks'].filter( el => {
          if(el.hasOwnProperty('owner') && el.owner) 
            return el.owner.id === currentUser.id
        })
        
      case 'ASSIGNED':
        // debugger
        return data['allUserTasks'].filter( el => {
          if(el.hasOwnProperty('assignees') && el.assignees)
            
            return el.assignees.find( ass => ass.id === currentUser.id)
        })
      case 'REPORT':
        try{
          const cachedStats = client.readQuery({
            query: UserStatistics,
            variables: {
              'userId': currentUser.id
            }
          })
          console.log(cachedStats);
          return cachedStats;
        }catch(e){
          console.log(e)
        }
      default:
        break;
    }
  }
  const renderSegment = (contextData) => {
    // let queryObj = {}
    // switch(activeTab){
    //   case 'ALL':
    //     queryObj = {
    //       'query': AllTasksQuery,
    //       'operationName': 'allUserTasks',
    //       'variables': {
    //         'userId': currentUser.id
    //       }
    //     }
    //     break;
    //   case 'OWNED':
    //     queryObj = {
    //       'query': OwnedTasksQuery,
    //       'operationName': 'ownedTasks',
    //       'variables': {
    //         'ownerId': currentUser.id
    //       }
    //     }
    //     break;
    //   case 'ASSIGNED':
    //     queryObj = {
    //       'query': AssignedTasksQuery,
    //       'operationName': 'assignedTasks',
    //       'variables': {
    //         'assigneeId': currentUser.id
    //       }
    //     }
    //     break;
        
    // }
    return (
      <div>
         {/* <Query 
            query={queryObj.query} 
            variables={queryObj.variables}

          >
            {({data, loading, subscribeToMore}) => {
              // debugger
              console.log(data, loading)
              return(
                <div> */}
                <TaskTab
                  data={contextData}
                  currentUser={currentUser}
                  toggleTaskDetail={toggleTaskDetail}
                  // loading={loading}
                  // query={queryObj}
                />
                {/* <Subscription subscribeToMore={subscribeToMore}/> */}
                {/* </div>
              )}}
            </Query> */}
            </div>
    // </Tab.Pane>
    )
  }
  const goToReport = () => setActiveTab('REPORT')
  const toggleTaskDetail = (task) => {
    console.log('[Dashboard:toggleTaskDetail] setting selected task: ', task);
    setSelectedTask(task);
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
        <Menu.Item
          name='REPORT'
          active={activeTab === 'REPORT'}
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
      <Grid textAlign='left' columns={3} centered>
        <Grid.Column style={{padding: '0px'}} className='container' 
          width={9}>
          <Ref innerRef={ref}>
            <Rail dividing position='left' style={{width: '340px', padding: '0px', marginLeft: '35px', display: 'flex'}}>
              <Query query={UserStatistics} variables={{'userId': currentUser.id}}>
                {({data, loading, subscribeToMore}) => {
                  console.log('[statsRail] ', data, loading);
                  return(
                    <React.Fragment>
                      <Sticky context={ref} style={{flex: 1}}>
                        <StatsRail 
                          currentUser={currentUser} 
                          data={data} 
                          loading={loading}
                          goToReport={goToReport}  
                        />
                      </Sticky>
                      <StatsSubscription subscribeToMore={subscribeToMore}/>
                    </React.Fragment>
                  )
                  
                }}
               
              </Query>
            </Rail>
          </Ref>
          {activeTab !== 'REPORT' 
            ?
              <Query query={AllTasksQuery} variables={{'userId': currentUser.id}}>
                {({ data, loading, subscribeToMore }) => {
                  console.log(data, loading)
                  const contextData = data && !loading ? createContextData(data) : null;
                  return(
                    <div>
                      {currentUser ? renderSegment(contextData) : ''}
                      <Subscription subscribeToMore={subscribeToMore}/>
                  </div>
                  )
                }}
              </Query>
            :
              <StatsPage
                data={createContextData()}
                currentUser={currentUser}
              />
          }
          <Ref innerRef={ref}>
            <Rail position='right' style={{width: '340px', padding: '0px', marginLeft: '35px', marginRight: '35px', display: 'flex'}} >
                <Sticky context={ref} style={{flex: 1}}> 
                {selectedTask ? 
                  <Query 
                      query={TaskTimeEntries} 
                      variables={{'taskId': selectedTask.id, 'userId': currentUser.id}}
                    >
                    {({data, loading, subscribeToMore}) => {
                      console.log('[detailsRail] ', data, loading);
                      if(data && !loading)
                      {
                          const railData = {
                          ...data['taskTimeDetails'],
                          task: selectedTask,
                        }
                        return(
                          <React.Fragment>
                            <Sticky context={ref} style={{flex: 1}}>
                              <DetailsRail
                                currentUser={currentUser} 
                                data={railData} 
                                toggleTaskDetail={toggleTaskDetail}  
                              />
                            </Sticky>
                            <StatsSubscription subscribeToMore={subscribeToMore}/>
                          </React.Fragment>
                        )
                      }
                      else return null; 
                    }}
                  
                  </Query>
                  : ''}
                </Sticky>
            </Rail>
            </Ref>
          </Grid.Column>
        </Grid>  
      </div>
    </div>
    // <Tab panes={panes} />
  );
}