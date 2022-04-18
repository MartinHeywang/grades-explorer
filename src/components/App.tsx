import React, { FC, Suspense } from "react";
import { Route, Routes } from "react-router-dom";

const HomePage = React.lazy(() => import("./HomePage"));
const AboutPage = React.lazy(() => import("./AboutPage"));
const AppPage = React.lazy(() => import("./AppPage"));
const LoginPage = React.lazy(() => import("./LoginPage"));

const App: FC<{}> = () => {
    return (
        <div className="App">
            <Suspense fallback={<p>Chargement...</p>}>
                <Routes>
                    <Route path="app" element={<AppPage/>}/>
                    <Route path="login" element={<LoginPage/>}/>

                    <Route path="about" element={<AboutPage/>}/>
                    <Route path="/" element={<HomePage/>}/>
                </Routes>
            </Suspense>
        </div>
    );
};

export default App;
