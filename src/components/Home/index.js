import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useGraphQL } from '../../hooks/useGraphQL';
import LogoTitle from '../../assets/images/logo-s.png'
import AnimatedLetters from '../AnimatedLetters';
import Logo from './Logo';
import './index.scss'
import Loader from 'react-loaders';
import ParticlesHome from './ParticlesHome';


const query = `
        query {
            homePage(id: "4wcjQtrSDjXaY4qwqN7xYH") {
                jobTitles
            }
        }`

const Home = () => {
    const { callQuery } = useGraphQL();

    const [homeData, setHomeData] = useState(null);
    const [isHidden, setIshidden] = useState(false);

    const [letterClass, setLetterClass] = useState('text-animate')
    


    const nameArray = ['a', 'r', 'r', 'e', 'n', ',']
    const jobArray = [
        'S', 
        'o',  
        'f', 
        't', 
        'w', 
        'a', 
        'r', 
        'e', 
        ' ', 
        'D', 
        'e', 
        'v',
        '.'
    ]
    

    useEffect(() => {
        const fetchData = async () => {
            const result = await callQuery(query);
            if (result) {
                setHomeData(result.data);
            }
        };
        fetchData();
    }, [callQuery]);

    useEffect(() => {
        if (homeData) { 
          const timer = setTimeout(() => {
            setIshidden(true);
          }, 250);
    
          return () => clearTimeout(timer);
        }
    }, [homeData]);

    
    useEffect(() => {
        const timer = setTimeout(() => {
            setLetterClass('text-animate-hover');
        }, 4000);

        return () => {
            clearTimeout(timer);
        }
    });

    if (!homeData) {
        return (
            <div>
                <Loader className="loader-active" type="triangle-skew-spin" />
            </div>
        )
    } 

    
    return (
        <>  
            <div className="tsparticles-home-container"> 
                <ParticlesHome/>
            </div>
            <div className="container home-page">
                <div className="text-zone">
                    <h1>
                    <span className={letterClass}>H</span>
                    <span className={`${letterClass} _12`}>i,</span>
                    <br />
                    <span className={`${letterClass} _13`}>I</span>
                    <span className={`${letterClass} _14`}>'m</span>
                    <img src={LogoTitle} alt="developer" />
                    <AnimatedLetters letterClass={letterClass}
                    strArray={nameArray}
                    idx={24}/>
                    <br />
                    <AnimatedLetters letterClass={letterClass}
                    strArray={jobArray}
                    idx={29}/>
                    </h1>
                    <h2>{homeData.homePage.jobTitles}</h2>
                    <Link to="/contact" className='flat-button'>
                        CONTACT ME
                    </Link>
                </div>
                <Logo />
            </div>
            <Loader type="triangle-skew-spin" className={`${isHidden ? "loader-hidden" : "loader-active"} loader-delay`} />
        </>
    )
}

export default Home