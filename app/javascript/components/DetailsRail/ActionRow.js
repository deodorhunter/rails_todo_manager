import React, {useState} from 'react';
import {Grid, Button, Icon, Message} from 'semantic-ui-react';
import {Mutation} from 'react-apollo';
import {CompleteTaskMutation, DeleteTaskMutation} from '../ListItem/operations.graphql';
import DeleteIconButton from './DeleteIconButton';
import AllTasksQuery from '../Dashboard/operations.graphql';
import Subscription from '../Subscription';

const ActionRow = ({
    canDelete, 
    taskId, 
    taskCompleted, 
    toggleTimer, 
    currentUser, 
    toggleInfoMessage,
    toggleTaskDetail
}) => {
    const [visible, setVisible] = useState(true);
    const [taskDeleted, setTaskDeleted] = useState(false);
    const [deleteMessageVisible, setDeletedMessageVisible] = useState(false);
    const startTimer = () => {
        // will invoke Timer component in parent
        setVisible(false);
        toggleTimer(true);
    }
    const toggleDelete = (deleteTask, taskId) => {
        debugger
        deleteTask({
            variables: {
                'taskId':taskId,
            },
            // update: (cache, { data: { deleteTask } }) => {
            //     const {deletedTask} = deleteTask;
            //     if (deletedTask.id) {
            //       const currentTasks = cache.readQuery({
            //         query: AllTasksQuery,
            //         variables: {
            //           'userId': currentUser.id
            //         }
            //       }); 
            //       debugger
            //       console.log(currentTasks, currentTasks["allUserTasks"].filter( task => task.id !==deletedTask.id)) 
            //       cache.writeQuery({
            //         query: AllTasksQuery,
            //         data: {
            //           allUserTasks: currentTasks["allUserTasks"].filter( task => task.id !==deletedTask.id),
            //         },
            //       });
            //       console.log(cache.readQuery({
            //         query: AllTasksQuery,
            //         variables: {
            //           'userId': currentUser.id
            //         }
            //       }))
            //     }
            // }
            refetchQueries: [{
                query: AllTasksQuery,
                variables: {
                    'userId': currentUser.id
                }
            }]
        })
        setTaskDeleted(true);
        setTimeout(() => toggleTaskDetail(null), 2000);
        setTimeout( () => toggleInfoMessage(
            true,
            {
                'header': 'Task deleted',
                'content': `Task ${taskId} was deleted successfullly!`
            },
            'delete'
        ), 2000);
        // setTimeout(async () => {
        //     setDeletedMessageVisible(true);
        //     await setTimeout(() => {
        //         setDeletedMessageVisible(false)
        //     }, 5000)
        // },2000)
    }

    if(visible) return(
        <Grid.Row style={{justifyContent: 'space-between', padding: 10}}>
            <Button.Group>
                <Mutation mutation={CompleteTaskMutation}>
                    {(completeTask, {loading}) => (
                        <Button icon onClick={() => completeTask({
                            variables: {
                                'id':taskId,
                                'completed': true
                            }})} 
                            loading={loading}
                            disabled={taskCompleted}
                            positive={taskCompleted}
                        >
                            <Icon name='checkmark'/>
                        </Button>
                    )}
                </Mutation>
                
                {canDelete ? 
                    <Mutation mutation={DeleteTaskMutation}>
                    {(deleteTask, {loading}) => (
                        
                        <React.Fragment>
                            <Button icon onClick={() => toggleDelete(deleteTask, taskId)}
                                loading={loading}
                                negative={taskDeleted}
                            >
                                <Icon name="delete"/>
                            </Button>
                            {deleteMessageVisible ?
                                <Message
                                    info
                                    attached='bottom'
                                    header='Task deleted successfully!'
                                    style={{marginTop: 30}}
                                />
                            : null}
                        </React.Fragment>
                    )}
                    
                </Mutation>
                : null }
            </Button.Group>
            <Button.Group>
                <Button icon onClick={() => startTimer()}>
                    <Icon name="clock"/>
                </Button>
            </Button.Group>
        </Grid.Row>
    )
    else return null;
}

export default ActionRow;