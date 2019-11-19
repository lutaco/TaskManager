import React, {PureComponent} from 'react';
import { connect } from 'react-redux';
import { Task } from './Task/Task';
import {
    addTaskAction,
    removeTaskAction
} from '../store/actions'
import './Stage.css';

class Stage extends PureComponent {


    constructor(props) {
        super(props);
        this.nextStage = props.nextStage && null;
    }

    moveTask = () => {
        debugger;
        const {
            stage,
            addTaskActionDispatch,
            removeTaskActionDispatch
        } = this.props;

        const nextStage = stage.nextStage;

        if (stage.tasks.length !== 0) {
            const lastTask = stage.tasks[stage.tasks.length - 1];
            removeTaskActionDispatch(lastTask.id);
            addTaskActionDispatch({
                task: lastTask,
                stageId: nextStage
            });
        }
    };

    render() {

        const {stage} = this.props;
        const { tasks, stageName } = stage;
        debugger;
        return  (
            <div className="stage">
                <div className="stage-header">
                    <div className="stage-title">{stageName}</div>
                    <div className="stage-buttons">
                        <button className="button stage-button" onClick={() => this.moveTask()}>MOVE</button>
                    </div>
                </div>
                {tasks.map(({taskText, id}) => (
                    <Task
                        key={id}
                        taskText={taskText}
                    />
                ))}
            </div>
        );
    }

}

const mapDispatchToProps = dispatch => ({
    removeTaskActionDispatch: taskId => dispatch(
        removeTaskAction(taskId)
    ),
    addTaskActionDispatch: ({task, stageId}) => dispatch(
        addTaskAction({task, stageId})
    )
});

export default connect(
    null,
    mapDispatchToProps
)(Stage);

