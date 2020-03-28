import React from 'react';
import { Input } from "../../components/input";
import './form.css'

type State = {
    username: string;
};

export class Form extends React.Component<{}, State> {
    state: State = {
        username: ''
    };

    handleSubmit = () => {
        alert('My name is: ' + this.state.username);
    };

    handleChange = (event: React.FormEvent<HTMLInputElement>) => {
        this.setState({ username: event.currentTarget.value });
    };

    render() {
        return (
            <form onSubmit={this.handleSubmit} className='form' data-testid="form">
                <h3 className='title'>Fill to show your username:</h3>
                <div className='username'>
                    <label>Input username:</label>
                    <Input type='text' handleChange={this.handleChange} value={this.state.username}/>
                </div>
                <div className='submit-button'>
                    <Input type='submit' value='submit'/>
                </div>
            </form>
        )
    }
}
