import React from "react";
import './select.css'

type Props = {
    id: string,
    label: string,
    value: string | string[],
    name: string,
    options: string[],
    multiple?: boolean,
    handleChange: (event: React.FormEvent<HTMLSelectElement>) => void;
};

export const Select = (props: Props) => {
    return (
        <div className='select-group'>
            <label htmlFor={props.id}>{props.label}:</label>
            <select id={props.id} value={props.value} name={props.name} onChange={props.handleChange} multiple={props.multiple}>
                {props.options.map((option, index) => <option value={option} key={index}>{option}</option>)}
            </select>
        </div>
    )

};
