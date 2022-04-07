import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import PlayableTile from './PlayableTile';
import './TileCarousel.css'

export default function TileCarousel({ content, option, identifier }) {
    const initial = content.length;
    const [difference, setDifference] = useState(initial);

    const [backTarget, setBackTarget] = useState(0);
    const [prevDirection, setPrevDirection] = useState();
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    const [changeNum, setChangeNum] = useState(8);

    useEffect(() => {
        // console.log(screenWidth)
        if (screenWidth <= 1190) {
            setChangeNum(8)
        } else if (screenWidth <= 1360) {
            setChangeNum(9)
        } else {
            setChangeNum(10)
        }

    }, [screenWidth])

    // useEffect(() => {
    //     if (screenWidth <= 1190) {
    //         setChangeNum(8)
    //     } else if (screenWidth <= 1360) {
    //         setChangeNum(9)
    //     } else if (screenWidth <= 1400) {
    //         setChangeNum(11)
    //     } else {
    //         setChangeNum(12)
    //     }

    // }, [screenWidth])


    const [forwardTarget, setForwardTarget] = useState(changeNum);

    useEffect(() => {
        setDifference(initial - forwardTarget);
        if (prevDirection === 'forward') setBackTarget(forwardTarget - changeNum);
        if (prevDirection === 'back') setForwardTarget(backTarget + changeNum);

    }, [prevDirection, initial, difference, forwardTarget, backTarget, changeNum])

    useEffect(() => {
        const updateWidth = () => {
            setScreenWidth(window.innerWidth)
        };
        window.addEventListener('resize', updateWidth);

        return () => window.removeEventListener('resize', updateWidth)
    }, [])

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
                return prev + changeNum;
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
