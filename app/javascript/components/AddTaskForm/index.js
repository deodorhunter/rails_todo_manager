import React from "react";
import { Mutation } from "react-apollo";
import { AddTaskMutation } from "./operations.graphql";
import { TasksQuery } from "../Dashboard/operations.graphql";
import ProcessTaskForm from "../ProcessTaskForm";

const AddTaskForm = () => (
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
                    const task = addTask.task;
                    if (task) {
                        const currentTasks = cache.readQuery({ query: TasksQuery });
                        cache.writeQuery({
                            query: TasksQuery,
                            data: {
                                tasks: [task].concat(currentTasks.tasks),
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