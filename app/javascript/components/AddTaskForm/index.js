import React from "react";
import { Mutation } from "react-apollo";
import { AddTaskMutation } from "./operations.graphql";
import { AllTasksQuery } from "../Dashboard/operations.graphql";
import ProcessTaskForm from "../ProcessTaskForm";

const AddTaskForm = ({currentUser}) => (
  <Mutation mutation={AddTaskMutation}>
    {(addTask, { loading }) => (
      <ProcessTaskForm
        buttonText="Add Task"
        loading={loading}
        onProcessItem={( value ) => 
            addTask({
                variables: {
                    value
                },
            })
        }
      />
    )}
  </Mutation>
);

export default AddTaskForm;