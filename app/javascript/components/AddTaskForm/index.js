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
                    // debugger use fetchQueries to get all, owned and assigned refreshed
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
                                allUserTasks: [task, ...currentTasks.allUserTasks]
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