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
                update: (cache, { data: { addTask } }) => {
                    // debugger
                    const task = addTask.task;
                    if (task) {
                        const currentTasks = cache.readQuery({
                          query: AllTasksQuery,
                          variables: {
                            'userId': currentUser.id
                          }
                         });
                        cache.writeQuery({
                            query: AllTasksQuery,
                            variables: {
                              'userId': currentUser.id
                            },
                            data: {
                                allUserTasks: [...currentTasks.allUserTasks, task]
                            },
                        });
                    }
                },
            })
        }
      />
    )}
  </Mutation>
);

export default AddTaskForm;