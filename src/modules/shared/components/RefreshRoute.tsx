import { Redirect, useParams } from "react-router";


const PageRefresh: React.FC = () => {

    const destination = `/${useParams<IPageRefreshRouteParams>().destination}`;

    return <Redirect to={destination} />;
} 

interface IPageRefreshRouteParams {
    destination: string;
}

export default PageRefresh;