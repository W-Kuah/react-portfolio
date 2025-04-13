import { useRef, useEffect, useState } from 'react'
import { useGraphQL } from '../../hooks/useGraphQL';
import Loader from 'react-loaders'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css'
import "leaflet-defaulticon-compatibility";
import emailjs from '@emailjs/browser'
import AnimatedLetters from '../AnimatedLetters'
import ReCAPTCHA from "react-google-recaptcha";
import './index.scss'

const query = `
        query {
            mapPage (id: "2roLVKn18LMxeypG5ClU5") {
                prompt
            }
        }`

const Contact = () => {
  const { callQuery } = useGraphQL();
      
  const [contactData, setContactData] = useState(null);
  const [isHidden, setIshidden] = useState(false);

  const [letterClass, setLetterClass] = useState('text-animate')
  const form = useRef();
  const recaptchaRef = useRef();

  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
        const fetchData = async () => {
              const result = await callQuery(query);
              if (result) {
                  setContactData(result.data);
              }
        };
        fetchData();
      }, [callQuery]);
      
      useEffect(() => {
          if (contactData) { 
              const timer = setTimeout(() => {
                setIshidden(true);
              }, 250);
        
              return () => clearTimeout(timer);
          }
      }, [contactData]);

  const sendEmail = (e) => {
    e.preventDefault();

    if (!isVerified) {
      alert("Please verify you're not a robot");
      return;
    }

    emailjs
      .sendForm('service_5ztkovh', 'template_219rq6u', form.current, 'BiNv_s3m-UPXMHGtA')
      .then(() => {
        alert('Message successfully sent!');
        window.location.reload(false);
      })
      .catch(() => {
        alert('Failed to send the message, please try again');
      });
  }
  const handleRecaptchaChange = (token) => {
    setIsVerified(!!token);
  }

  useEffect(() => {
    const timer = setTimeout(() => {
        setLetterClass('text-animate-hover');
    }, 3000);

    return () => {
        clearTimeout(timer);
    }
  });

  if (!contactData) {
          return (
              <div>
                  <Loader className="loader-active" type="triangle-skew-spin" />
              </div>
          )
      } 

  return (
    <>
      <div className="container contact-page">
        <div className="text-zone">
          <h1>
            <AnimatedLetters
              letterClass={letterClass}
              strArray={['C', 'o', 'n', 't', 'a', 'c', 't', ' ', 'm', 'e']}
              idx={15}
            />
          </h1>
          <p>
           {contactData.mapPage.prompt} </p>
          <div className="contact-form">
            <form ref={form} onSubmit={sendEmail}>
              <ul>
                <li className="half">
                  <input placeholder="Name" type="text" name="name" required />
                </li>
                <li className="half">
                  <input
                    placeholder="Email"
                    type="email"
                    name="email"
                    required
                  />
                </li>
                <li>
                  <input
                    placeholder="Subject"
                    type="text"
                    name="subject"
                    required
                  />
                </li>
                <li>
                  <textarea
                    placeholder="Message"
                    name="message"
                    required
                  ></textarea>
                </li>
                <li className="part-send">
                  <input type="submit" className="flat-button" value="SEND" />
                </li>
                <li className="part-captcha">
                  <ReCAPTCHA
                    className="contact-recaptcha"
                    ref={recaptchaRef}
                    sitekey="6Lfc2hArAAAAAPxP7675BxZ7Ej0bLl7s8t4qDcJW"
                    onChange={handleRecaptchaChange}
                    theme="dark"
                    size="normal"
                  />
                </li>
                
              </ul>
            </form>
          </div>
        </div>
        <div className="info-map">
          Warren Kuah,
          <br />
          Australia,
          <br />
          127-South Yarra Railway Station/Toorak Rd <br />
          South Yarra, 3141 <br />
          <br />
          <span>warren@warrenkuah.com</span>
        </div>
        <div className="map-wrap">
          <MapContainer center={[-37.839005855718845, 144.99245713927814]} zoom={13}>
            <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
            <Marker position={[-37.839005855718845, 144.99245713927814]}>
              <Popup>Warren lives in this area, come over for a cuppa</Popup>
            </Marker>
          </MapContainer>
        </div>
      </div>
      <Loader type="triangle-skew-spin" className={`${isHidden ? "loader-hidden" : "loader-active"} loader-delay`} />
    </>
  )
}

export default Contact