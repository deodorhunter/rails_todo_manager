import React, { useState } from "react";
import {Input, Icon} from 'semantic-ui-react';
import './style.css';

const ProcessTaskForm = ({
  initialValue = "",
  onProcessItem,
  loading
}) => {
  const [value, setValue] = useState(initialValue);
  const processForm = () => {
      onProcessItem(value)
      setValue('')
  }
  return (
    <div >
      <Input inverted transparent
          action={{
            icon: (
              <Icon.Group size="big">
                <Icon inverted color="grey" name="tasks"  />
                <Icon corner="bottom right" name="add" color="grey"/>
              </Icon.Group>
            ),
            // labelPosition: "right",
            color: "teal",
            onClick: () => processForm()
          }}
          placeholder={"Add new task ..."}
          value={value}
          onChange={e => setValue(e.currentTarget.value)}
          style={{width: '400px'}}
          // className='addTaskField'
        />
    </div>
  );
};

export default ProcessTaskForm;