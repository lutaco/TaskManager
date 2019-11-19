const ADD_STAGE ='ADD_STAGE';
const ADD_TASK = 'ADD_TASK';
const REMOVE_TASK ='REMOVE_TASK';

const addStageAction = (stage) => ({
    type: ADD_STAGE,
    payload: stage
});

const addTaskAction = ({task, stageId}) => ({
    type: ADD_TASK,
    payload: {
        task, stageId
    }
});

const removeTaskAction = taskId => ({
    type: REMOVE_TASK,
    payload: taskId
});

export {
    ADD_STAGE,
    ADD_TASK,
    REMOVE_TASK,
    addStageAction,
    addTaskAction,
    removeTaskAction,
}
