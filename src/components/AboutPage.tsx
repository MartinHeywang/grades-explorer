import React, { FC } from "react";

import Page from "./Page";

const Button = React.lazy(() => import("./Button"));

const AboutPage: FC<{}> = () => {
    return (
        <Page>
            <h1>À propos</h1>
            <p>
                Réalisé en Martin Heywang en 2022.{" "}
                <a href="https://github.com/MartinHeywang">Compte Github</a> |{" "}
                <a href="https://github.com/MartinHeywang/grades-explorer">Dépôt GitHub</a>
            </p>
            <Button action="/">Retour</Button>
        </Page>
    );
};

export default AboutPage;
