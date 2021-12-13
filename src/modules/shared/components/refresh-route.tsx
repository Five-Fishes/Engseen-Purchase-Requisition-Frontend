import { Redirect, useParams } from "react-router";

/** @deprecated Do not use this component, it **was** meant to support CSR when hitting WhiteLabelError */
const PageRefresh: React.FC = () => {

    const destination = `/${useParams<IPageRefreshRouteParams>().destination}`;

    return <Redirect to={destination} />;
} 

interface IPageRefreshRouteParams {
    destination: string;
}

export default PageRefresh;