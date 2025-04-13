import React, { useState, useEffect } from 'react';
import { useGraphQL } from '../../hooks/useGraphQL';
import Loader from 'react-loaders';
import "./index.scss";
import AnimatedLetters from '../AnimatedLetters';

const query = `
        query {
            portfolioPageElementCollection {
                items {
                    portfolioElementTitle
                    portfolioElementTags
                    portfolioElementImage {
                        url
                    }
                    elementDestination
                }
                total
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
                  console.log(portfolioData);
                  console.log(portfolioData.portfolioPageElementCollection.items[0])
                }, 250);
          
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
                        console.log(`port: ${port}`);
                        console.log(`idx: ${idx}`);
                        return (
                            <div className="image-box" key={idx}>
                                <i></i>
                                <img 
                                    src={port.portfolioElementImage.url}
                                    className="portfolio-image"
                                    alt="portfolio"
                                />
                                <div className="content">
                                    <p className="title">{port.portfolioElementTitle}</p>
                                    <h4 className="description">{port.portfolioElementTags.join(", ")}</h4>
                                    <button
                                        className="btn"
                                        onClick={() => window.open(port.elementDestination)}
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
                <div>{renderPortfolio(portfolioData.portfolioPageElementCollection.items)}</div>
            </div>
            <Loader type="triangle-skew-spin" className={`${isHidden ? "loader-hidden" : "loader-active"} loader-delay`}/>
        
        </>
    )  
}

export default Portfolio;