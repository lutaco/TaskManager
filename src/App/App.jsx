import React, { PureComponent, Fragment } from 'react';
import {connect} from 'react-redux';
import {
    addStageAction, addTaskAction
} from '../store/actions';
import ModalForm from "../ModalForm/ModalForm";
import nanoid from 'nanoid';
import Stage from '../Stage/Stage.jsx';
import './App.css';

class App extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            addStage: false,
            addTask: false,
        }
    }

    addTask = (TaskName) => {
        const { addTaskActionDispatch, stages } = this.props;
        if (stages.length && TaskName)
            addTaskActionDispatch({
                task: {
                    id: nanoid(),
                    taskText: TaskName
                },
                stageId: stages[0].id
            });
        this.setState({addTask: false})
    };

    addStage = (stageName) => {
        const { addStageActionDispatch } = this.props;
        if (stageName)
            addStageActionDispatch({
                id: nanoid(),
                stageName: stageName,
                tasks: []
            });
        this.setState({addStage: false})
    };

    prepareStages = stages => (
        stages.reduceRight((stages, stage) => ([
            ...stages,
            {
                ...stage,
                nextStage: stages.length ? stages[stages.length - 1].id : null
            }
        ]), []).reverse()
    );

    render() {
        const {
            stages
        } = this.props;

        const {
            addStage, addTask
        } = this.state;

        return (
            <Fragment>
                    <div className="page-header">
                        <div className="center">
                            <div className="top-bar">
                                <div className="top-bar-title">Task Manager</div>
                                <div className="top-bar-buttons">
                                    <button  onClick={() => this.setState({addStage: true})} className="button">Add Stage</button>
                                    <button  onClick={() => this.setState({addTask: true})} className="button">Add Task</button>
                                </div>
                            </div>
                        </div>
                    </div>
                <div className="center">
                    <div className="task-board">
                        {
                            this.prepareStages(stages).map(stage => (
                                <Stage key={stage.id} stage={stage} />
                            ))
                        }
                    </div>
                </div>
                {
                    addStage && <ModalForm
                        title="Create Stage"
                        onApply={args => this.addStage(args)}
                        onClose={() => this.setState({addStage: false})}
                    />
                }
                {
                    addTask && <ModalForm
                        title="Create Task"
                        onApply={args => this.addTask(args)}
                        onClose={() => this.setState({addTask: false})}
                    />
                }
            </Fragment>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    addStageActionDispatch: stage => dispatch(addStageAction(stage)),
    addTaskActionDispatch: ({task, stageId}) => dispatch(addTaskAction({task, stageId}))
});

const mapStateToProps = ({ stages }) => ({ stages });

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);
