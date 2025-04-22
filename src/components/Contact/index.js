import { useRef, useEffect, useState } from 'react'
import { useGraphQL } from '../../hooks/useGraphQL';
import Loader from 'react-loaders'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css'
import "leaflet-defaulticon-compatibility";
import AnimatedLetters from '../AnimatedLetters'
import { GoogleReCaptchaProvider, useGoogleReCaptcha } from 'react-google-recaptcha-v3';

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
          <GoogleReCaptchaProvider
            reCaptchaKey={process.env.REACT_APP_RECAPTCHA_SITE_KEY}
            scriptProps={{
              async: true,
              defer: true,
              appendTo: 'head'
            }}
          >
            <ContactForm/>
          </GoogleReCaptchaProvider>
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


const ContactForm = () => {

  const form = useRef();
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [isSubmitting, setIsSubmitting] = useState(false);


  const sendEmail = async (e) => {
    e.preventDefault();

    if (!executeRecaptcha) return;
    setIsSubmitting(true);

    try {
      const token = await executeRecaptcha('contact_form_submit');

      const response = await fetch('/.netlify/functions/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          formData: Object.fromEntries(new FormData(form.current)),
          recaptchaToken: token
        })
      });

      const result = await response.json();

      if (!response.ok) {
        if (result.error === 'TOKEN_EXPIRED') {
          alert('Form submission expired. Please try again.');
          return;
        }
        console.log(result);
        throw new Error(result.error || 'Submission failed');
      }

      alert('Message successfully sent!');
      form.current.reset();
      // emailjs
      //   .sendForm('service_5ztkovh', 'template_219rq6u', form.current, 'BiNv_s3m-UPXMHGtA')
      //   .then(() => {
      //     alert('Message successfully sent!');
      //     window.location.reload(false);
      //   })
      //   .catch(() => {
      //     alert('Failed to send the message, please try again');
      //   });
    } catch (error) {
      alert(error.message || 'Failed to send the message, please try again');
    } finally {
      setIsSubmitting(false);
    }
  }
    

  

  return (
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
          <input 
            type="submit" 
            className="flat-button" 
            value={isSubmitting ? "SENDING..." : "SEND"}
            disabled = {isSubmitting} />
        </li>
        <li className="part-captcha">
        </li>
      </ul>
    </form>
  )
}

export default Contact