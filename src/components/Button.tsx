import React, { FC } from "react";

import { useNavigate } from "react-router-dom";

import "../scss/Button.scss";

interface Props {
    className?: string;

    action?: string | (() => void);

    disabled?: boolean;
}

const Button: FC<Props> = ({ className = "", action, disabled, children }) => {
    const navigate = useNavigate();

    function handleClick() {
        if (!action) return;

        if (typeof action === "string") {
            navigate(action);
            return;
        }

        action();
    }

    return (
        <button className={`Button ${className}`} onClick={handleClick} disabled={disabled}>
            {children}
        </button>
    );
};

export default Button;
