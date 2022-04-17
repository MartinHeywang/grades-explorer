import React, { FC, Suspense } from "react";
import { Route, Routes } from "react-router-dom";

const HomePage = React.lazy(() => import("./HomePage"));
const AboutPage = React.lazy(() => import("./AboutPage"));

const App: FC<{}> = () => {
    return (
        <div className="App">
            <Suspense fallback={<p>Chargement...</p>}>
                <Routes>
                    <Route path="about" element={<AboutPage/>}/>
                    <Route path="/" element={<HomePage/>}/>
                </Routes>
            </Suspense>
        </div>
    );
};

export default App;
