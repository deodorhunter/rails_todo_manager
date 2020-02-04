import React, {useEffect, useState, useRef} from 'react';
import PropTypes from 'prop-types';
import {Segment} from 'semantic-ui-react';
import ActionBar from './ActionBar';

const Clock = ({active, setPlay, stopTimer}) => {
    const [seconds, setSeconds] = useState(null);
    const [minutes, setMinutes] = useState(0);
    const [hours, setHours] = useState(0);
    const [time, setTime] = useState(0)
    const timerRef = useRef(null);

    const stopAction = () => {
        stopTimer(time);
    }

    const startTimer = () => {
        timerRef.current = setTimeout(() => {
            setSeconds(0)
          }, 1000)
    }

    useEffect(() => {
        if (timerRef.current === null && seconds == null) {
            startTimer()
          }
        return () => {
            clearTimeout(timerRef.current)
        }
    }, [])

    useEffect(() => {
        console.log('[Clock] is active? ', active);
        if(active){
            if (seconds < 59) 
                timerRef.current = setTimeout(() => setSeconds(seconds + 1), 1000);
            else{
                timeRef.current = setTimeout(() => setSeconds(0), 1000);
                if(minutes < 59)
                    setMinutes(minutes + 1);  
                else{
                    setMinutes(0);  
                    setHours(hours + 1);  
                }
            }
            setTime(seconds + minutes*60 + hours*3600);
            console.log('[Clock] time is ', time);  
        }
        else clearTimeout();
    },[seconds, active]);

    const renderTime = () => {
        // setTime(seconds + minutes*60 + hours*3600);
        const formattedTime = new Date(null)
        formattedTime.setSeconds(time);
        return formattedTime.toISOString().substr(11, 8);
    }

    return(
        <Segment 
            style={{
                display: 'flex', 
                alignItems: 'center', 
                justifyContent:'center', 
                flexDirection: 'column', 
                width: '100%',
                backgroundColor: 'rgba(0,0,0,0)',
                fontSize: 50,
                fontWeight: '700',
                color: 'white',
                padding: 10,
                paddingTop: 50,
                paddingBottom: 20
            }}
        >
            {renderTime()}
            <div style={{marginTop: 40}}>
                <ActionBar
                    setPlay={setPlay}
                    stopAction={stopAction}
                />
            </div>
            
        </Segment>
    )
};

Clock.propTypes = {
    active: PropTypes.bool.isRequired,
    setPlay: PropTypes.func.isRequired,
    stopTimer: PropTypes.func.isRequired
}

export default Clock;