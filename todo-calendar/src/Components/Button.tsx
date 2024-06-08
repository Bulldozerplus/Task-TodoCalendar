import React from 'react';

type ButtonProps = React.ComponentProps<'button'> & {}
const Button = ({children, onClick, className} : ButtonProps) => {
    return (
        <button className={className} onClick={onClick}>
            {children}
        </button>
    );
};

export default Button;