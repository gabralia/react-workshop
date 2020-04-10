import React from 'react';
import { Input } from "../../components/input";
import './form.css'
import { Select } from "../../components/select";

type Single = 'firstName' | 'lastName' | 'gender' | 'grade' | 'province' | 'city';

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
    skills: string[],
    area: Record<string, string[]>
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
        skills: ['Javascript', 'HTML', 'CSS', 'React', 'Angular', 'Vue', 'Java', 'PHP', 'C#'],
        area: {
            'Shaanxi': ['Xian', 'Xianyang', 'Baoji', 'Hanzhong', 'Others'],
            'Sichuan': ['Chengdu', 'Zigong', 'Panzhihua', 'Others'],
            'Jiangsu': ['Nanjing', 'Xuzhou', 'Lianyungang', 'Yangzhou', 'Others'],
            'Beijing': ['Beijing']
        },
        province: 'Shaanxi',
        city: 'Xian'
    };

    handleSubmit = () => {
        alert(`
        My name is: ${this.state.firstName} ${this.state.lastName},
        I'm ${this.state.gender},
        my grade is ${this.state.grade},
        skill stack: ${this.state.skill.join(',')},
        I'm from ${this.state.province}, ${this.state.city}
        `);
    };

    handleChange = (event: React.FormEvent<HTMLInputElement> | React.FormEvent<HTMLSelectElement>) => {
        const { name, value } = event.currentTarget;
        this.setState({ [name]: value } as Pick<State, Single>);
        if (name === 'province') {
            this.setState({ city: this.state.area[value][0] });
        }
    };

    handleMultipleSelectChange = (event: React.FormEvent<HTMLSelectElement>) => {
        const selectedOptions = Array.from(event.currentTarget.selectedOptions, option => option.value);
        this.setState({ skill: selectedOptions });
    };

    render() {
        return (
            <form onSubmit={this.handleSubmit} className='form' data-testid="form">
                <h3 className='title'>Personal Information</h3>
                <Input id='firstName' name='firstName' type='text' handleChange={this.handleChange}
                       value={this.state.firstName} label='First Name'/>
                <Input id='lastName' name='lastName' type='text' handleChange={this.handleChange}
                       value={this.state.lastName} label='Last Name'/>
                <div className='radio-group'>
                    <label>Gender:</label>
                    <Input id='gender' type='radio' name='gender' handleChange={this.handleChange}
                           items={this.state.genders}
                           checked={this.state.gender}/>
                </div>
                <Select id='grade' label='Grade' name='grade' value={this.state.grade} options={this.state.grades}
                        handleChange={this.handleChange}/>
                <Select id='skill' label='Skill' name='skill' value={this.state.skill} options={this.state.skills}
                        handleChange={this.handleMultipleSelectChange} multiple/>
                <Select id='province' label='Province' value={this.state.province} name='province'
                        options={Object.keys(this.state.area)} handleChange={this.handleChange}/>
                <Select id='province' label='City' value={this.state.city} name='city'
                        options={this.state.area[this.state.province]} handleChange={this.handleChange}/>
                <Input id='submit' type='submit' value='submit'/>
            </form>
        )
    }
}
