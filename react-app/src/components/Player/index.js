import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import AudioPlayer, { RHAP_UI } from 'react-h5-audio-player'
import 'react-h5-audio-player/lib/styles.css';
import './Player.css';
import * as playActions from '../../store/active';
import { useLocation } from 'react-router-dom';

export default function Player() {
    const dispatch = useDispatch();
    const active = useSelector(({ active }) => active);
    const sessionUser = useSelector(({ session }) => session.user);
    const location = useLocation();

    let songUrl;
    let artworkUrl;

    if (active.currentSong) {
        songUrl = active.currentSong.song_url;
        artworkUrl = active.currentSong.album /* && location.pathname.includes('library') */
            ? active.currentSong.album.image_url
            : active.currentSong.image_url
        // artworkUrl =
    };

    const handleOnPlay = () => {
        dispatch(playActions.togglePlay())
        document.querySelector('.rhap_progress-bar')
            .classList.add('active')
        document.querySelector('.rhap_progress-indicator')
            .classList.add('active');
    }

    const handleOnPause = () => {
        dispatch(playActions.togglePlay())
        document.querySelector('.rhap_progress-bar')
            .classList.remove('active')
        document.querySelector('.rhap_progress-indicator')
            .classList.remove('active');
    }

    return (
        <div className='player-container'>
            <div className='current-song-info-container'>
                {active.currentSong && (
                    <>
                        <img
                            alt='current song artwork'
                            className='current-song-artwork'
                            src={artworkUrl}
                        />
                        <div className='current-song-info'>
                            <p className='song-title'>{active.currentSong.title}</p>
                            <p className='song-artist'>{active.currentSong.artist.name}</p>
                        </div>
                    </>

                )}
            </div>
            {sessionUser && (
                <AudioPlayer
                    src={songUrl} customAdditionalControls={[]}
                    onPlay={handleOnPlay}
                    onPause={handleOnPause}
                    className='player'
                    layout='horizontal-reverse'
                />
            )}

        </div>
    )
}
