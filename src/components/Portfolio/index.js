import React, { useState, useEffect } from 'react';
import { useGraphQL } from '../../hooks/useGraphQL';
import Loader from 'react-loaders';
import "./index.scss";
import AnimatedLetters from '../AnimatedLetters';
import portfolioDataTemp from '../../data/portfolio.json';

const query = `
        query {
            homePage(id: "4wcjQtrSDjXaY4qwqN7xYH") {
                jobTitles
            }
            aboutPage (id: "6p9LN1Cg5EMcfAIDGqwtI4") {
                introduction
                preAmble
                point1
                point2
                point3
            }
            portfolioPageElementCollection {
                items {
                portfolioElementTitle
                portfolioElementTags
                }
            }
            mapPage (id: "2roLVKn18LMxeypG5ClU5") {
                prompt
            }
        }`

const Portfolio = () => {
    const { callQuery } = useGraphQL();
        
    const [portfolioData, setPortfolioData] = useState(null);
    const [isHidden, setIshidden] = useState(false);

    const [letterClass, setLetterClass] = useState('text-animate')


    useEffect(() => {
          const fetchData = async () => {
                const result = await callQuery(query);
                if (result) {
                    setPortfolioData(result.data);
                }
          };
          fetchData();
        }, [callQuery]);
        
        useEffect(() => {
            if (portfolioData) { 
                const timer = setTimeout(() => {
                  setIshidden(true);
                }, 500);
          
                return () => clearTimeout(timer);
            }
        }, [portfolioData]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLetterClass('text-animate-hover');
        }, 3000);

        return () => {
            clearTimeout(timer);
        }
    });

    const renderPortfolio = (portfolio) => {
        return (
            <div className="images-container">
                {
                    portfolio.map((port, idx) => {
                        return (
                            <div className="image-box" key={idx}>
                                <img 
                                    src={port.cover}
                                    className="portfolio-image"
                                    alt="portfolio"
                                />
                                <div className="content">
                                    <p className="title">{port.title}</p>
                                    <h4 className="description">{port.description}</h4>
                                    <button
                                        className="btn"
                                        onClick={() => window.open(port.url)}
                                    >View</button> 
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        );
    }

    if (!portfolioData) {
            return (
                <div>
                    <Loader className="loader-active" type="triangle-skew-spin" />
                </div>
            )
        } 

    return (
        <>
            <div className="container portfolio-page">
                <h1 className="page-title">
                    <AnimatedLetters
                        idx={15}
                        strArray={['P', 'o', 'r', 't', 'f', 'o', 'l', 'i', 'o']}
                        letterClass={letterClass}
                    />
                </h1>
                <div>{renderPortfolio(portfolioDataTemp.portfolio)}</div>
            </div>
            <Loader type="triangle-skew-spin" className={`${isHidden ? "loader-hidden" : "loader-active"}`}/>
        
        </>
    )  
}

export default Portfolio;