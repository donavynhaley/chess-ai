import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
background-color: #2D2D2B;
color: white;
font-size: 20px;
padding: 10px 60px;
border-radius: 5px;
margin: 10px 0px;
cursor: pointer;
`
const Button = ({ onClick, text }) => {
    return (
        <StyledButton onClick={onClick}>
            {text}
        </StyledButton>

    )
}

export default Button
