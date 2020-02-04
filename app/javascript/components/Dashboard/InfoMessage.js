import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {Message} from 'semantic-ui-react';

const InfoMessage = ({message, mode, onMessageDismiss}) => {
    let color = 'blue';
    switch (mode) {
        case 'delete':
            color = 'red';
            break;
        case 'success':
            color = 'green';
            break;
        case 'warning':
            color = 'yellow';
            break;
        default:
            break;
    }

    return(
        <Message
            color={color}
            onDismiss={() => onMessageDismiss()}
            header={message.header}
            content={message.content}
        />
    )
}

InfoMessage.propTypes = {
    message: PropTypes.object,
    mode: PropTypes.string,
    onMessageDismiss: PropTypes.func,
}

export default InfoMessage;