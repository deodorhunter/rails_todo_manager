import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {Header, Segment} from 'semantic-ui-react';
import Clock from './Clock';
import { useMutation} from '@apollo/react-hooks';
import {AddTimeEntryMutation} from './operations.graphql';

const Timer = ({task, currentUser, toggleTimer}) =>  {
    const [play, setPlay] = useState(true);
    const [addTimeEntry] = useMutation(AddTimeEntryMutation);
    const activateTimer = (bool) => {
        setPlay(bool)
        console.log('[Timer] setting play to ', play)
    }
    const stopTimer = (time) => {
        console.log('[Timer] time to add: ', time);
        addTimeEntry({
            variables: {
                time: time,
                taskId: task.id
            }
        })
        toggleTimer(false);
    }
    if(task)
        return (
            <React.Fragment>
                <div 
                    style={{
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent:'center', 
                        flexDirection: 'column', 
                        backgroundColor: 'rgba(0,0,0,0.8)',
                        width: '100%'
                    }}
                >
                <div style={{
                    color: 'white', 
                    fontSize: 20, 
                    fontWeight: '500', 
                    padding: 10, 
                    paddingTop: 20, 
                    textAlign: 'left'
                }}>
                    Now tracking time for:
                </div>
                <Header as='h1' 
                    dividing 
                    style={{
                        width: '100%',
                        // fontSize: 36,
                        // fontWeight: '700',
                        color: 'white',
                        margin: 0,
                        padding: 20
                    }}
                    textAlign='center'
                >
                    {task.value}
                </Header>
                <Clock 
                    active={play}
                    setPlay={activateTimer}
                    stopTimer={stopTimer}    
                />
                    
                </div>
            </React.Fragment>
            
        );
}

Timer.propTypes = {
    task: PropTypes.object.isRequired,
    currentUser: PropTypes.object.isRequired,
    toggleTimer: PropTypes.func.isRequired
}

export default Timer;