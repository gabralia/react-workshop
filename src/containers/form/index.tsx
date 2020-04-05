import React from 'react';
import { Input } from "../../components/input";
import './form.css'
import { Select } from "../../components/select";

type Single = 'firstName' | 'lastName' | 'gender' | 'grade';

type Multiple = 'skill';

type SingleInfoState = {
    [K in Single]: string
};

type MultipleInfoState = {
    [K in Multiple]: string[];
}

type State = {
    genders: string[],
    grades: string[],
    skills: string[]
} & SingleInfoState & MultipleInfoState;

export class Form extends React.Component<{}, State> {
    state: State = {
        firstName: '',
        lastName: '',
        gender: 'Female',
        genders: ['Female', 'Male'],
        grade: 'Consultant',
        grades: ['Consultant', 'Senior Consultant', 'Lead Consultant'],
        skill: ['Javascript', 'HTML'],
        skills: ['Javascript', 'HTML', 'CSS', 'React', 'Angular', 'Vue', 'Java', 'PHP', 'C#']
    };

    handleSubmit = () => {
        alert(`
        My name is: ${this.state.firstName} ${this.state.lastName},
        I'm ${this.state.gender},
        my grade is ${this.state.grade},
        skill stack: ${ this.state.skill.join(',') }
        `);
    };

    handleChange = (event: React.FormEvent<HTMLInputElement> | React.FormEvent<HTMLSelectElement>) => {
        const { name, value } = event.currentTarget;
        this.setState({ [name]: value } as Pick<State, Single>);
    };

    handleMultipleSelectChange = (event: React.FormEvent<HTMLSelectElement>) => {
        const selectedOptions = Array.from(event.currentTarget.selectedOptions, option => option.value);
        this.setState({ skill: selectedOptions });
    };

    render() {
        return (
            <form onSubmit={this.handleSubmit} className='form' data-testid="form">
                <h3 className='title'>Personal Information</h3>
                <Input type='text' name='firstName' handleChange={this.handleChange} value={this.state.firstName}
                       label='First Name'/>
                <Input type='text' name='lastName' handleChange={this.handleChange} value={this.state.lastName}
                       label='Last Name'/>
                <div className='radio-group'>
                    <label>Gender:</label>
                    <Input type='radio' name='gender' handleChange={this.handleChange} items={this.state.genders}
                           checked={this.state.gender} />
                </div>
                <Select label='Grade' name='grade' value={this.state.grade} options={this.state.grades}
                        handleChange={this.handleChange}/>
                <Select label='Skill' name='skill' value={this.state.skill} options={this.state.skills}
                        handleChange={this.handleMultipleSelectChange} multiple/>
                <Input type='submit' value='submit'/>
            </form>
        )
    }
}
