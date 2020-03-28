import React from "react";

type Props = {
    type: string;
    value?: string
    handleChange?: (event: React.FormEvent<HTMLInputElement>) => void
};

export const Input = (props: Props) => {
    return (
        props.type === 'text' ?
            <input type='text' value={props.value} onChange={props.handleChange} aria-label="input"/>
            : <input type='submit' value='submit' aria-label="submit"/>
    );
};
