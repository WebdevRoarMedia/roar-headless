import { useQuery } from '@apollo/client';
import { GET_HOME_MAIN_VIDEO } from '../../graphql/queries/GET_HOME_VIDEOS';

export default function HomeMainHero (){
    const { data, loading, error } = useQuery(GET_HOME_MAIN_VIDEO);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error loading video</p>;
  
    const videoUrl = data.page.homeMainVideo.homeMainVideoUrl;
    return(
        <>
        <video autoPlay muted>
            <source src={videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
        </video>
        </>
    )
}

