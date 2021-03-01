import React, { Component } from 'react';
class FloatingInput extends Component {
    render() {
        return (
            <div>
                <div className="form-floating mb-3">
                    <input
                        type={this.props.type}
                        className="form-control"
                        id={this.props.id}
                        placeholder={this.props.placeholder}
                        value={this.props.value}
                        onChange={this.props.changed}
                    />
                    <label
                        htmlFor={this.props.for}>
                        {this.props.label}
                    </label>
                </div>
            </div>
        )
    }
}

export default FloatingInput;