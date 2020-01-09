import { Mutation } from "react-apollo";
import {AllTasksQuery} from '../Dashboard/operations.graphql'
import React from 'react';
import {List, Label, Icon, Button} from 'semantic-ui-react';
import CompleteTaskMutation from './operations.graphql';
import PropTypes from 'prop-types';


const ListItem = ({assignee, value, category, completed, overdue, owner, id, currentUser}) => (
    <Mutation mutation={CompleteTaskMutation}>
        {(completeTask, {loading}) => {
            // console.log(id, completed)
            const completeOnClick = (id) => {
                completeTask({
                    variables: {
                        id,
                        'completed': true
                    },
                    update: (cache, { data: { completeTask } }) => {
                        const task = completeTask.task;
                        if (task) {
                            const currentTasks = cache.readQuery({
                            query: AllTasksQuery,
                            variables: {
                                'userId': currentUser.id
                            }
                            });

                            currentTasks.allUserTasks[currentTasks.allUserTasks.findIndex( el => el.id === task.id)] = task;
                            console.log(currentTasks.allUserTasks);
                            cache.writeQuery({
                                query: AllTasksQuery,
                                variables: {
                                'userId': currentUser.id
                                },
                                data: {
                                    allUserTasks: currentTasks.allUserTasks
                                },
                            });
                        }
                    },
                })
            }
            const renderOptionsGroup = () => {
                if(!completed){
                    if((owner.id === currentUser.id && !assignee) || (owner.id !== currentUser.id && assignee.id === currentUser.id))
                        return(
                            <Button positive floated='right'
                                content='Done' 
                                icon='checkmark' 
                                labelPosition='right'
                                onClick={()=> completeOnClick(id)}
                            />
                        )
                }
                else return null
            }

            return(
                <List.Item key={id} verticalAlign='middle' style={{backgroundColor: 'white', paddingTop: '10px'}}>
                    <div style={{display: 'flex', padding: '10px'}}>
                    <List.Icon name='tasks' size='large' verticalAlign='middle' color={ completed ? 'green': 'red'} style={{paddingLeft: '10px'}} />
                        <List.Content verticalAlign='middle' style={{flex: 1, paddingBottom: '0px'}}>
                        <List.Header as='h2' size='huge' style={{margin: 'auto'}}>{value}</List.Header>
                        <List.Description className="content">created by {' '}{owner? owner.username : ''}</List.Description>
                        {/* <List.Content floated='right' verticalAlign='middle'> */}
                            {/* {!completed ? 
                                <Button positive floated='right'
                                    content='Done' 
                                    icon='checkmark' 
                                    labelPosition='right'
                                    onClick={()=> completeOnClick(id)}
                                />
                            : ''}   */}
                            {renderOptionsGroup()}
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
                                {assignee ? 
                                <Label image className='metatag'>
                                    <img src='https://react.semantic-ui.com/images/avatar/small/joe.jpg' />
                                    @{assignee.username}
                                </Label>
                                : ''}
                            {/* </span> */}
                        </div>  
                        
                        </List.Content>
                    </div>
                    
                </List.Item>
            )
        }}
    </Mutation>
);

ListItem.propTypes = {
    assignee: PropTypes.string,
    category: PropTypes.string,
    completed: PropTypes.bool.isRequired,
    id: PropTypes.string.isRequired,
    overdue: PropTypes.string,
    owner: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired
}

export default ListItem;