import { useEffect, useState } from 'react'
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

const About = () => {
  const [letterClass, setLetterClass] = useState('text-animate')

  useEffect(() => {
    const timer = setTimeout(() => {
        setLetterClass('text-animate-hover');
    }, 3000);

    return () => {
        clearTimeout(timer);
    }
});

  return (
    <>
      <div className="container about-page">
        <div className="text-zone">
          <h1>
            <AnimatedLetters
              letterClass={letterClass}
              strArray={['A', 'b', 'o', 'u', 't', ' ', 'm', 'e']}
              idx={15}
            />
          </h1>
          <p>
            As a full-stack developer, I enjoy crafting end-to-end solutions for web development,
            business automation and all things related to software and technology.
          </p>
          <p align="LEFT">
            I believe the two most important attributes of a person is the desire to 
            learn and integrate new knowledge consistently 
            and the ability to perform in high-pressure environments.
          </p>
          <p>
            I can adapt to a dynamic work enivorment - I enjoy coordinating and cooperating with others, and at the same time,
            I am proficient at working independently when the nature of the work requires a flow state.
          </p>
        </div>

        <div className="stage-cube-cont">
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
      <Loader type="triangle-skew-spin" />
    </>
  )
}

export default About
