import React from 'react';
import {Segment, Grid, List, Icon, Header, Button} from 'semantic-ui-react';
import {Mutation, Query} from 'react-apollo';
import {AddTaskTimeEntry, TaskTimeEntries} from './operations.graphql';
import moment from 'moment';

const DetailsRail = ({data, toggleTaskDetail, currentUser, loading}) => {
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
    // TODO: make a function for rendering timeEntries, it's cleaner
    console.log('[DetailsRail] data: ', data);
    const {task, timeEntries} = data;
    return (
        <Segment style={{display: 'flex', alignItems: 'center', justifyContent:'center', flexDirection: 'row', width: '100%'}}>
            <Grid style={{flex:1, flexDirection:'row', padding: '14px'}}>
                <Grid.Row style={{justifyContent: 'space-between', paddingTop: 0}}>
                    {/* this will be button action row */}
                    {/* make this row a separate component, with mutations for update/delete */}
                    <Button.Group>
                        <Button icon >
                            <Icon name='checkmark'/>
                        </Button>
                        {task && task.owner.id === currentUser.id ? 
                            <Button icon >
                                <Icon name="delete"/>
                            </Button>
                            : null }
                    </Button.Group>
                    <Button.Group>
                        <Button icon>
                            <Icon name="clock"/>
                        </Button>
                    </Button.Group>
                </Grid.Row>
                <Grid.Row style={{flex:1, flexDirection:'row'}}>
                    {task ? 
                    <React.Fragment>
                        <Header as='h1' 
                            dividing 
                            style={{width: '100%'}}
                            textAlign='center'
                        >
                            {task.value}
                        </Header>
                        <List relaxed style={{width: '100%'}}>
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
                <Grid.Row  style={{justifyContent: 'center'}}>
                    {/* <Query 
                        query={TaskTimeEntries} 
                        variables={{'taskId': task.id, 'userId': currentUser.id}}
                    >
                        {({data, loading, subscribeToMore}) => {
                            console.log(data, loading);
                            const {timeEntries} = data;
                            return(
                                <React.Fragment> */}
                                    {timeEntries 
                                        ? (timeEntries.length !== 0 && !loading ?
                                        <React.Fragment>
                                        <Header as='h3'>Time entries:</Header>
                                        <List divided relaxed style={{justifyContent: 'center'}}>
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
                                        :
                                        <div>
                                            porcodio
                                        </div>
                                    ) : null
                                    }
                                {/* </React.Fragment> */}
                            {/* ) */}
                        {/* }} */}

                    {/* </Query> */}
                </Grid.Row>
            </Grid>
        </Segment>
    )
}

export default DetailsRail;