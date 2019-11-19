import React, {PureComponent}  from 'react';
import './ModalForm.css'

class ModalForm extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            valueField: ''
        }
    }

    onChange = ({ target: { name, value } }) => {
        this.setState({
            [name]: value
        });
    };

    send = (event) => {
        event.preventDefault();
        const {valueField} = this.state;
        const {onApply} = this.props;
        onApply(valueField);
    };

    render() {
        const {valueField} = this.state;
        const {title, onClose} = this.props;

        return (
            <div className="modal-wrap">
                <div className="modal-window">
                    <div className="modal-window-title">{title}</div>
                    <form className="modal-window-form" onSubmit={event => this.send(event)}>
                        <input
                            className="input-line"
                            name="valueField"
                            value={valueField}
                            onInput={this.onChange}
                            onChange={this.onChange}
                            onBlur={this.onChange}
                        />
                        <div className="modal-window-buttons">
                            <button className="button modal-window-button">Apply</button>
                            <button className="button modal-window-button" type="button" onClick={onClose}>Close
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default ModalForm;
