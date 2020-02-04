import React, {useState} from 'react';
import {Segment, Grid, List, Icon, Header, Button} from 'semantic-ui-react';
import {Mutation, Query} from 'react-apollo';
import {AddTaskTimeEntry, TaskTimeEntries} from './operations.graphql';
import moment from 'moment';
import ActionRow from './ActionRow';
import Timer from '../Timer';

const DetailsRail = ({data, toggleTaskDetail, currentUser, loading, toggleInfoMessage}) => {
    const [timerActive, setTimerActive] = useState(false);
    console.log('[DetailsRail] timer is active? ', timerActive)
    const humanizeTime = (createdAt) => {
        const time = moment(createdAt).format('DD-MMM-YY h:mm:ss a');
        console.log(time)
        return  time
    };
    const timeNormalization = (time) => {
        // debugger
        // const duration = moment.duration(time, 'seconds')
        // return duration.
        // TODO: find a way to use moment.js for this
        return new Date(time * 1000).toISOString().substr(11, 8)
    }
    const toggleTimer = (bool) => {
        setTimerActive(bool);
    }
    const renderTimeEntries = (timeEntries) => {
        if(!timeEntries && loading)
            return(
                <div>
                    loading
                </div>
            )
        else if(timeEntries && !loading && timeEntries.length !== 0 )
            return (
            <React.Fragment>
                <Header as='h3'>Time entries:</Header>
                <List divided relaxed style={{justifyContent: 'center', padding: 8}}>
                    {timeEntries.map((te, index) => (
                        <List.Item key={index}>
                            <List.Content floated="right">
                                {timeNormalization(te.time)}
                            </List.Content>
                            <Icon 
                                name='time' 
                                size='small' 
                                verticalAlign='middle' 
                            />
                            <List.Content>
                                <List.Header as='a'>
                                    {te.user.username}
                                </List.Header>
                                <List.Description>
                                    {`On ${humanizeTime(te.createdAt)}`}
                                </List.Description>
                            </List.Content>
                        </List.Item>
                    ))}
                </List>
            </React.Fragment>
            )
        else return(
            null
        )
    }
    // TODO: make a function for rendering timeEntries, it's cleaner
    console.log('[DetailsRail] data: ', data);
    const {task, timeEntries} = data;
    return (
        <Segment style={{display: 'flex', alignItems: 'center', justifyContent:'center', flexDirection: 'row', width: '100%', padding: 0, border: 0}}>
            {!timerActive ?
            <Grid style={{flex:1, flexDirection:'row', padding: '16px'}}>
                <ActionRow 
                    taskId={task.id} 
                    taskCompleted={task.completed}
                    toggleTimer={toggleTimer} 
                    canDelete={task && task.owner.id === currentUser.id}
                    currentUser={currentUser}
                    toggleInfoMessage={toggleInfoMessage}
                    toggleTaskDetail={toggleTaskDetail}
                />
                <Grid.Row style={{flex:1, flexDirection:'row', padding: 10}}>
                    {task ? 
                    <React.Fragment>
                        <Header as='h1' 
                            dividing 
                            style={{width: '100%'}}
                            textAlign='center'
                        >
                            {task.value}
                        </Header>
                        <List relaxed style={{width: '100%', paddingHorizontal: 5}}>
                            {task.category ? <List.Item>
                                <Icon 
                                    name='tag' 
                                    // size='small' 
                                    verticalAlign='middle' 
                                />
                                <List.Content>
                                    <List.Header as='a'>
                                        Category:
                                    </List.Header>
                                    <List.Description>
                                        {task.category}
                                    </List.Description>
                                </List.Content>
                            </List.Item> : null}
                            <List.Item>
                                <Icon 
                                    name='user' 
                                    // size='small' 
                                    verticalAlign='middle' 
                                />
                                <List.Content>
                                    <List.Header as='a'>
                                        Added by:
                                    </List.Header>
                                    <List.Description>
                                        {task.owner.username}
                                    </List.Description>
                                </List.Content>
                            </List.Item>
                            {task.overdue ?<List.Item>
                                <Icon 
                                    name='calendar alternate outline' 
                                    // size='small' 
                                    verticalAlign='middle' 
                                />
                                <List.Content>
                                    <List.Header as='a'>
                                        Overdue:
                                    </List.Header>
                                    <List.Description>
                                        {humanizeTime(task.overdue)}
                                    </List.Description>
                                </List.Content>
                            </List.Item> : null}
                            {task.assignees && task.assignees.length !== 0 ? <List.Item>
                                <Icon 
                                    name='at' 
                                    // size='small' 
                                    verticalAlign='middle' 
                                />
                                <List.Content>
                                    <List.Header as='a'>
                                        Assigned to:
                                    </List.Header>
                                    <List.Description>
                                        {task.assignees.map(ass => ass.username).join(', ')}
                                    </List.Description>
                                </List.Content>
                            </List.Item> : null }
                        </List>
                        </React.Fragment>
                    : null}
                </Grid.Row>
                <Grid.Row  style={{justifyContent: 'center', padding: 8}}>
                    {/* <Query 
                        query={TaskTimeEntries} 
                        variables={{'taskId': task.id, 'userId': currentUser.id}}
                    >
                        {({data, loading, subscribeToMore}) => {
                            console.log(data, loading);
                            const {timeEntries} = data;
                            return(
                                <React.Fragment> */}
                                    {renderTimeEntries(timeEntries)}
                                    
                                {/* </React.Fragment> */}
                            {/* ) */}
                        {/* }} */}

                    {/* </Query> */}
                </Grid.Row>
                <Grid.Row style={{padding: 10, paddingTop:0}}>
                    <Button 
                        compact 
                        floated='left'
                        onClick={() => toggleTaskDetail(null)}
                        style={{
                            border: 0,
                            backgroundColor: 'white',
                            padding: 0,
                            fontSize: 16,
                            marginTop: 14,
                        }}
                    >↵ Dismiss</Button>
                </Grid.Row>
            </Grid>
            : <Timer 
                task={task} 
                currentUser={currentUser}
                toggleTimer={toggleTimer}
              />}
        </Segment>
    )
}

export default DetailsRail;