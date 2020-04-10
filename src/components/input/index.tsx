import React from "react";
import './input.css';

type Props = {
    id: string;
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
                <label htmlFor={props.id}>{props.label}:</label>
                <input id={props.id} type='text' value={props.value} name={props.name} onChange={props.handleChange} aria-label='input'/>
            </div>
        )
    } else if (props.type === 'radio') {
        return (
            <div className='radio-items' aria-label='radio'>{
                props.items?.map((item, index) =>
                    <div className='radio-info' key={index}>
                        <label htmlFor={props.id + index}>{item}</label>
                        <input id={props.id + index} type='radio' value={item} name={props.name} onChange={props.handleChange}
                               checked={item === props.checked}/>
                    </div>)}
            </div>
        )
    } else {
        return (
            <div className='submit-button'>
                <input id={props.id} type='submit' value='submit' aria-label='submit'/>
            </div>
        )
    }
};
