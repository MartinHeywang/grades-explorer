import React, { FC } from "react";

import Page from "./Page";

import "../scss/HomePage.scss";

const Button = React.lazy(() => import("./Button"));

const HomePage: FC<{}> = () => {
    return (
        <Page className="HomePage">
            <div className="HomePage__text">
                <h1>Marre d'être concentré en permanence sur tes notes ?</h1>
                <p>Avec cet explorateur de notes, vois tes notes autrement pour réduire le stress.</p>
                <Button className="HomePage__open-app" action="app">Ouvrir l'app</Button>
            </div>
        </Page>
    );
};

export default HomePage;
