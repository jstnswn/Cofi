import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import './Player.css';
import * as playActions from '../../store/active';

export default function Player() {
    const dispatch = useDispatch();
    const active = useSelector(({ active }) => active);
    const sessionUser = useSelector(({ session }) => session.user);

    let url;

    // const isPlaying = active.isPlaying
    if (active.currentSong) url = active.currentSong.song_url

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
            {sessionUser && (
                <AudioPlayer
                    src={url} customAdditionalControls={[]}
                    onPlay={handleOnPlay}
                    onPause={handleOnPause}
                    className='player'
                />
            )}
        </div>
    )
}
