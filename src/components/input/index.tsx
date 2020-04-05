import React from "react";
import './input.css';

type Props = {
    type: string;
    label?: string;
    value?: string;
    name?: string;
    items?: string[];
    checked?: string;
    handleChange?: (event: React.FormEvent<HTMLInputElement>) => void;
};

export const Input = (props: Props) => {

    if (props.type === 'text') {
        return (
            <div className='text-info'>
                <label>{props.label}:</label>
                <input type='text' value={props.value} name={props.name} onChange={props.handleChange}
                       aria-label='input'/>
            </div>
        )
    } else if (props.type === 'radio') {
        return (
            <div className='radio-items' aria-label='radio'>{
                props.items?.map((item, index) =>
                    <div className='radio-info' key={index}>
                        <label>{item}</label>
                        <input type='radio' value={item} name={props.name} onChange={props.handleChange}
                               checked={item === props.checked}/>
                    </div>)}
            </div>
        )
    } else {
        return (
            <div className='submit-button'>
                <input type='submit' value='submit' aria-label='submit'/>
            </div>
        )
    }
};
