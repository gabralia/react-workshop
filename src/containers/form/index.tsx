import React from 'react';
import { Input } from "../../components/input";
import './form.css'
import { Select } from "../../components/select";
import { Error } from "../../components/error";
import { Redirect } from "react-router-dom";

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
    area: Record<string, string[]>,
    errors: Record<string, string>,
    canSubmit: boolean
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
        city: 'Xian',
        errors: {},
        canSubmit: false
    };

    isEmpty = (name: string, value: string) => {
        if (value.trim()) {
            return false;
        }
        this.setState({ errors: { ...this.state.errors, [name]: `${name} is required.` } });
        return true;
    };

    isAlphabet = (name: string, value: string) => {
        if (/^[a-zA-Z\s]+$/.test(value)) {
            return true;
        }
        this.setState({ errors: { ...this.state.errors, [name]: `${name} format is not correct.` } });
        return false;
    };

    handleSubmit = (event: React.FormEvent) => {
        const singleValueAttrs = ['firstName', 'lastName', 'gender', 'grade', 'province', 'city'];
        const singleValueValidate = singleValueAttrs.every((key: string) =>
            !this.isEmpty(key, this.state[key as Single]) && this.isAlphabet(key, this.state[key as Single]));
        const multipleValuesValidate = !!this.state.skill.length;
        if (singleValueValidate && multipleValuesValidate) {
            const savedInfos = localStorage.getItem('infos');
            if (savedInfos) {
                const infoRecords = JSON.parse(savedInfos);
                infoRecords.push(this.state);
                localStorage.setItem('infos', JSON.stringify(infoRecords));
            } else {
                localStorage.setItem('infos', JSON.stringify([this.state]));
            }
            this.setState({ canSubmit: true });
            return;
        }
        event.preventDefault();
    };

    setValue = (name: string, value: string) => {
        this.setState({ [name]: value } as Pick<State, Single>);
        if (name === 'province') {
            this.setState({ city: this.state.area[value][0] });
        }
    };

    handleChange = (event: React.FormEvent<HTMLInputElement> | React.FormEvent<HTMLSelectElement>) => {
        const { name, value } = event.currentTarget;
        this.setValue(name, value);
        if (!this.isEmpty(name, value) && this.isAlphabet(name, value)) {
            this.setState({ errors: { ...this.state.errors, [name]: '' } });
        }
    };

    handleMultipleSelectChange = (event: React.FormEvent<HTMLSelectElement>) => {
        const selectedOptions = Array.from(event.currentTarget.selectedOptions, option => option.value);
        this.setState({ skill: selectedOptions });
        if (!selectedOptions.length) {
            this.setState({ errors: { ...this.state.errors, skill: `skill is required.` } });
            return;
        }
        this.setState({ errors: { ...this.state.errors, skill: '' } });
    };

    render() {
        if (this.state.canSubmit) {
            return <Redirect push to='/info' />;
        }
        return (
            <form onSubmit={this.handleSubmit} className='form' data-testid="form">
                <h3 className='title'>Personal Information</h3>
                <Input id='firstName' name='firstName' type='text' handleChange={this.handleChange}
                       value={this.state.firstName} label='First Name'/>
                <Error errorMessage={this.state.errors['firstName']}/>
                <Input id='lastName' name='lastName' type='text' handleChange={this.handleChange}
                       value={this.state.lastName} label='Last Name'/>
                <Error errorMessage={this.state.errors['lastName']}/>
                <div className='radio-group'>
                    <label>Gender:</label>
                    <Input id='gender' type='radio' name='gender' handleChange={this.handleChange}
                           items={this.state.genders}
                           checked={this.state.gender}/>
                </div>
                <Error errorMessage={this.state.errors['gender']}/>
                <Select id='grade' label='Grade' name='grade' value={this.state.grade} options={this.state.grades}
                        handleChange={this.handleChange}/>
                <Error errorMessage={this.state.errors['grade']}/>
                <Select id='skill' label='Skill' name='skill' value={this.state.skill} options={this.state.skills}
                        handleChange={this.handleMultipleSelectChange} multiple/>
                <Error errorMessage={this.state.errors['skill']}/>
                <Select id='province' label='Province' value={this.state.province} name='province'
                        options={Object.keys(this.state.area)} handleChange={this.handleChange}/>
                <Error errorMessage={this.state.errors['province']}/>
                <Select id='province' label='City' value={this.state.city} name='city'
                        options={this.state.area[this.state.province]} handleChange={this.handleChange}/>
                <Error errorMessage={this.state.errors['city']}/>
                <Input id='submit' type='submit' value='submit'/>
            </form>
        )
    }
}
