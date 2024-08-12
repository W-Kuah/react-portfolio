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
          Results-driven software engineer focused on collaborative development using trunk-based workflow to implement user-centric applications. 
          I am interested in a position where I can leverage and develop my skills in front-end frameworks, APIs, testing and cloud.
          </p>
          <p align="LEFT">
            "Hey! - anyone can learn to code! <u>So what's so special about you?</u>"
          </p>
          <ul>
              <li id="point">
                I have experience working in <b>cross-functional teams</b> - knowing how to properly <b>communicate</b> and <b>reassure</b> stakeholders 
                that aren't necessarily software developers or techies is an important skill I have cultivated.
              </li>
              <br></br>
              <li id="point">
                I excel at being an <b>introvert</b> and an <b>extrovert</b> - whether you need me tightly coordinating with a team or going solo on a project,
                I deliver my best with <b>versatility</b> and <b>enthusiasm</b>. 
              </li>
              <br></br>
              <li id="point">
                I believe in <b>pro-active communication</b> - working with a new hire can be tricky, 
                I relish the opportunity to dive in, ask questions, <b>actively seek feedback</b>, and <b>quickly adapt</b> to the team's dynamics.
              </li>
            </ul>
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
