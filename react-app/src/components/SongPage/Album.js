import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getAlbum } from '../../store/albums';
import { orderContent } from '../utils';
import Song from './Song';

export default function Album() {
    const dispatch = useDispatch();


    const scrollContainer = useRef(null);




    // if (albums) {
    //     songs = orderContent(albums[albumId]);
    // }





    // const last = songs?.length - 1;

    return (
        <>
            <div className='library-song-body-header'>
                <p className='song-title column-title'>Title</p>
                <p className='song-artist column-title'>Artist</p>
                <p className='song-album column-title'>Album</p>
            </div>

            <div ref={scrollContainer} className='library-body-container'>
                <div className='library-songs-body-container'>

                </div>

            </div>
        </>
    )
}
