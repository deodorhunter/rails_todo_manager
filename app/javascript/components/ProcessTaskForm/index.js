import React, { useState } from "react";

const ProcessTaskForm = ({
  initialValue = "",
  onProcessItem,
  buttonText,
  loading
}) => {
  const [value, setValue] = useState(initialValue);
  const processForm = ({value}) => {
      onProcessItem(value)
      setValue('')
  }
  return (
    <div >
      <input
        type="text"
        placeholder="Your new task"
        value={value}
        onChange={e => setValue(e.currentTarget.value)}
      />
      {loading ? (
        "...Loading"
      ) : (
        <button
          onClick={() => processForm({value})}
        >
          {buttonText}
        </button>
      )}
    </div>
  );
};

export default ProcessTaskForm;