import { useEffect, useState } from 'react'
import { useGraphQL } from '../../hooks/useGraphQL';
import {
  faPython,
  faNodeJs,
  faGitAlt,
  faAws,
  faJava,
  faReact,
} from '@fortawesome/free-brands-svg-icons'
import Loader from 'react-loaders'
import AnimatedLetters from '../AnimatedLetters'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './index.scss'
import ParticlesCube from './ParticlesCube'

const query = `
        query {
            aboutPage (id: "6p9LN1Cg5EMcfAIDGqwtI4") {
                introduction
                preAmble
                point1
                point2
                point3
            }
        }`

const About = () => {
    const { callQuery } = useGraphQL();
      
    const [aboutData, setAboutData] = useState(null);
    const [isHidden, setIshidden] = useState(false);

    const [letterClass, setLetterClass] = useState('text-animate')

    useEffect(() => {
      const fetchData = async () => {
            const result = await callQuery(query);
            if (result) {
                setAboutData(result.data);
            }
      };
      fetchData();
    }, [callQuery]);
    
    useEffect(() => {
        if (aboutData) { 
            const timer = setTimeout(() => {
              setIshidden(true);
            }, 250);
      
            return () => clearTimeout(timer);
        }
    }, [aboutData]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLetterClass('text-animate-hover');
        }, 3000);

        return () => {
            clearTimeout(timer);
        }
  });
  if (!aboutData) {
          return (
              <div>
                  <Loader className="loader-active" type="triangle-skew-spin" />
              </div>
          )
      } 
  return (
    <>
      <div className="container about-page">
        <div className="text-zone about-text">
          <h1>
            <AnimatedLetters
              letterClass={letterClass}
              strArray={['A', 'b', 'o', 'u', 't', ' ', 'm', 'e']}
              idx={15}
            />
          </h1>
          <p>
          {aboutData.aboutPage.introduction}
          </p>
          <p align="LEFT">
            {aboutData.aboutPage.preAmble}
          </p>
          <ul>
              <li id="point">
                {aboutData.aboutPage.point1}
              </li>
              <br></br>
              <li id="point">
                {aboutData.aboutPage.point2} 
              </li>
              <br></br>
              <li id="point">
                {aboutData.aboutPage.point3} 
              </li>
            </ul>
        </div>

        <div className="stage-cube-cont">
        <ParticlesCube/>
          <div className="cubethrower">
            <div className="cubespinner">
              <div className="face1">
                <FontAwesomeIcon icon={faReact} color="#61DBFB" />
              </div>
              <div className="face2">
                <FontAwesomeIcon icon={faNodeJs} color="#68A063" />
              </div>
              <div className="face3">
                <FontAwesomeIcon icon={faPython} color="#306998" />
              </div>
              <div className="face4">
                <FontAwesomeIcon icon={faAws} color="000000" />
              </div>
              <div className="face5">
                <FontAwesomeIcon icon={faJava} color="#f89820" />
              </div>
              <div className="face6">
                <FontAwesomeIcon icon={faGitAlt} color="#EC4D28" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Loader type="triangle-skew-spin" className={`${isHidden ? "loader-hidden" : "loader-active"} loader-delay`} />
    </>
  )
}

export default About
