import React, { FC, useRef } from "react";
import { useNavigate } from "react-router-dom";

import Page from "./Page";
import Button from "./Button";

import { firebaseApp } from "../firebase";
import { getAuth, signInAnonymously } from "firebase/auth";

import "../scss/LoginPage.scss";

const LoginPage: FC<{}> = () => {

    const auth = useRef(getAuth(firebaseApp));
    const navigate = useNavigate();

    function loginAnonymous() {
        signInAnonymously(auth.current);
        navigate("/app");
    }

    return (
        <Page className="LoginPage">
            <h1 className="LoginPage__title">Accéder à l'application</h1>

            <div className="LoginPage__sections">
                <section className="LoginPage__section LoginPage__anonymous">
                    <h2>Utiliser directement</h2>
                    <p>Ne pas créer de compte pour le moment</p>
                    <Button className="LoginPage__button" action={loginAnonymous}>
                        On y va !
                    </Button>
                </section>
                <section className="LoginPage__section LoginPage__account">
                    <h2>Se connecter</h2>
                    <p>Fonctionnalité indisponible.</p>
                </section>
            </div>
        </Page>
    );
};

export default LoginPage;
