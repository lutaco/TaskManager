import {ADD_STAGE, ADD_TASK, REMOVE_TASK} from './actions';


export default function(state, {type, payload}) {
    switch(type){

        case ADD_STAGE:

            return {
                ...state,
                stages: [
                    ...state.stages,
                    payload
                ]
            };

        case ADD_TASK:

            debugger;
            const {task, stageId} = payload;

            return {
                ...state,
                stages:  state.stages.map(stage => ({
                    ...stage,
                    stageName: stage.stageName,
                    tasks: stage.id === stageId
                    ? [task, ...stage.tasks]
                    : stage.tasks
                }))
            };

        case REMOVE_TASK:
            return {
                ...state,
                stages: state.stages.map(stage => ({
                    ...stage,
                    tasks: stage.tasks.filter(task => task.id !== payload)
                }))
            };

        default:
                return state;
    }
};