import React, { FC } from "react";
import { Link } from "react-router-dom";

import "../scss/Header.scss";

const Header: FC<{}> = () => {
    return (
        <header className="Header">
            <div className="container">
                <p className="Header__title">
                    <Link to="/">
                        Explora
                        <wbr />
                        teur de notes
                    </Link>
                </p>
                <Link to="/about" className="Header__about">
                    À propos
                </Link>
            </div>
        </header>
    );
};

export default Header;
