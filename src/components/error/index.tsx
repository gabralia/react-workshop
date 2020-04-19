import React from "react";

type Props = {
    errorMessage: string,
}

export const Error = (props: Props) => {
    return (
        <div>
            {props.errorMessage && <div style={{ color: 'red' }}> * {props.errorMessage}</div>}
        </div>
    )
};
