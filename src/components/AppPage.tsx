import React, { FC, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

import { firebaseApp } from "../firebase";
import { getAuth } from "firebase/auth";

import Page from "./Page";
import { useNavigate } from "react-router-dom";

const AppPage: FC<{}> = () => {

    const [user, loading, error] = useAuthState(getAuth(firebaseApp));
    const navigate = useNavigate();

    // redirect to login page when not connected
    useEffect(() => {
        if (loading) return;

        if (!user) navigate("/login");
    }, [user, loading, error]);

    return loading ? (
        <>Connexion en cours...</>
    ) : (
        <Page className="AppPage">
            <h1>Connecté / prêt à l'emploi</h1>
        </Page>
    );
};

export default AppPage;
