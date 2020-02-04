import React from 'react';
import PropTypes from 'prop-types';
import {Button, Segment, Icon} from 'semantic-ui-react';

const ActionBar = ({setPlay, stopAction}) => {
    return (
        <Button.Group icon>
            <Button onClick={() => {
                console.log('playing')
                setPlay(true)
            }}
                style={{
                    backgroundColor: 'rgba(0,0,0,0.9)',
                    color: 'lightgray'
                }}
            >
                <Icon name='play'/>
            </Button>
            <Button onClick={() => {
                console.log('pausing')
                setPlay(false)
            }}
                style={{
                    backgroundColor: 'rgba(0,0,0,0.9)',
                    color: 'lightgray'
                }}
            >
                <Icon name='pause'/>
            </Button>
            <Button onClick={() => {
                console.log('stopping')
                stopAction()
            }}
                style={{backgroundColor: 'rgba(0,0,0,0.9)'}}
            >
                <Icon name='stop' color='red' />
            </Button>
        </Button.Group>
    )
};

ActionBar.propTypes = {
    setPlay: PropTypes.func.isRequired,
    stopAction: PropTypes.func.isRequired,
}

export default ActionBar;