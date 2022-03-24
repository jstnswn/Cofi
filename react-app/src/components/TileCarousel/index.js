import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import PlayableTile from './PlayableTile';
import './TileCarousel.css'

export default function TileCarousel({ content, option, identifier }) {
    // Get initial number of albums in carousel
    const initial = content.length;
    const [difference, setDifference] = useState(initial);

    // Start by targeting 8th div in carousel
    const [forwardTarget, setForwardTarget] = useState(8);
    const [backTarget, setBackTarget] = useState(0);
    const [prevDirection, setPrevDirection] = useState();

    useEffect(() => {
        setDifference(initial - forwardTarget);
        if (prevDirection === 'forward') setBackTarget(forwardTarget - 8);
        if (prevDirection === 'back') setForwardTarget(backTarget + 8);

    }, [prevDirection, initial, difference, forwardTarget, backTarget])

    const scrollRight = (e) => {
        e.preventDefault()
        if (difference <= 0) return;

        const tile = document.querySelector(`.tile-carousel.${identifier}`).children[forwardTarget];

        tile.scrollIntoView({
            block: 'nearest',
            behavior: 'smooth'
        });

        setForwardTarget(prev => {
            if (difference <= initial - prev) {
                return initial - 1;
            } else {
                return prev + 8;
            }
        })
        setPrevDirection('forward');
    }

    const scrollLeft = (e) => {
        e.preventDefault()
        if (difference >= initial) return;

        const tile = document.querySelector(`.tile-carousel.${identifier}`).children[backTarget];

        tile.scrollIntoView({
            block: 'nearest',
            behavior: 'smooth'
        });

        setBackTarget(prev => {
            if (prev - 8 <= 0) {
                return 0;
            } else {
                return prev - 8;
            }
        })
        setPrevDirection('back');
    };

    return (
        <div
            className='carousel-container'
        >
            <div className='carousel-button-container'>
                <i className='carousel-button fas fa-chevron-left' onClick={scrollLeft}></i>
                <i className='carousel-button fas fa-chevron-right' onClick={scrollRight}></i>
            </div>
            <div className={`tile-carousel ${identifier}`}>
                {content.map((item, idx) => (
                    <PlayableTile key={idx} item={item} option={option}/>

                ))}
            </div>
        </div>
    )
}
