import React from 'react'
import PlayableTile from './PlayableTile';
import './TileCarousel.css'

export default function TileCarousel({ content, option, identifier }) {
    const scrollRight = (e) => {
        e.preventDefault()
        const rightButtonLocation = document.querySelector('.fa-chevron-right').getBoundingClientRect().right;

        let tile;
        const tiles = document.querySelector(`.tile-carousel.${identifier}`).children;
        for (let currentTile of tiles) {
            if (rightButtonLocation - currentTile.getBoundingClientRect().right < 0) {
                tile = currentTile;
                break;
            }
        }
        if (!tile) return;

        tile.scrollIntoView({
            block: 'nearest',
            inline: 'start',
            behavior: 'smooth'
        });
    }

    const scrollLeft = (e) => {
        e.preventDefault()

        let tile;
        const tiles = document.querySelector(`.tile-carousel.${identifier}`).children;
        for (let i = tiles.length - 1; i >= 0; i--) {
            const currentTile = tiles[i];
            if (currentTile.getBoundingClientRect().left < 0) { // tile is large enough to use screen edge as boundry
                tile = currentTile;
                break;
            }
        }
        if (!tile) return;

        tile.scrollIntoView({
            block: 'nearest',
            inline: 'end',
            behavior: 'smooth'
        });
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
