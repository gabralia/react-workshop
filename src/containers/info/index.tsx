import React from "react";

export const Info = () => {

    const infos = JSON.parse(localStorage.getItem('infos') as string);
    return (
        <div>{
            infos && infos.map((info: Record<string, string | string[]>, index: number) =>
                <div style={{borderBottom: '#ccc 1px solid'}} key={index}>
                    <p>name: {info.firstName} {info.lastName}</p>
                    <p>gender:{info.gender}</p>
                    <p>grade:{info.grade}</p>
                    <p>skill:{(info.skill as string[]).join()}</p>
                    <p>address:{info.province} {info.city}</p>
                </div>
            )}
        </div>
    )
};
