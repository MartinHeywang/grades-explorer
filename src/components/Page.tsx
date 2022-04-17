import React, { FC, Suspense } from "react";

const Header = React.lazy(() => import("./Header"));

interface Props {
    className?: string;
}

const Page: FC<Props> = ({ children, className = "" }) => {
    return (
        <div className={`Page ${className}`}>
            <Suspense fallback="Chargement...">
                <Header />
                <div className="container Page__content">{children}</div>
            </Suspense>
        </div>
    );
};

export default Page;
