import React from 'react';
import styled from 'styled-components';


const Button = ({ onClick, text }) => {
    return (
        <button className="btn dark" onClick={onClick}>
            {text}
        </button>

    )
}

export default Button
