import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import LogoTitle from '../../assets/images/logo-s.png'
import AnimatedLetters from '../AnimatedLetters';
import Logo from './Logo';
import './index.scss'
import Loader from 'react-loaders';


const Home = () => {
    const [letterClass, setLetterClass] = useState('text-animate')
    const nameArray = ['a', 'r', 'r', 'e', 'n', ',']
    const jobArray = [
        'w', 
        'e',  
        'b', 
        ' ', 
        'd', 
        'e', 
        'v', 
        'e', 
        'l', 
        'o', 
        'p', 
        'e', 
        'r', 
        '.'
    ]
    useEffect(() => {
        const timer = setTimeout(() => {
            setLetterClass('text-animate-hover');
        }, 4000);

        return () => {
            clearTimeout(timer);
        }
    });



    return (
        <>
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
                    <h2>Aspiring Full-Stack Developer / Process Analyst</h2>
                    <Link to="/contact" className='flat-button'>
                        CONTACT ME
                    </Link>
                </div>
                <Logo />
            </div>
            <Loader type="triangle-skew-spin" />
        </>
    )
}

export default Home