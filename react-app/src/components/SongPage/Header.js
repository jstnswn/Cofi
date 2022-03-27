import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';

export default function Header({ album }) {
    const dispatch = useDispatch();

    const [showDropdown, setShowDropdown] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [showEdit, setShowEdit] = useState(false);

    const user = useSelector(({ session }) => session.user);

    const { albumId } = useParams();

    // const location = useLocation();
    // const history = useHistory();
    // const match = matchPath(location.pathname, {
    //     path: '/library/:user/:section/:id/'
    // });

    // const idParam = match?.params?.id;
    // const userParam = match?.params?.user;
    // const sectionParam = match?.params?.section;
    // const likedParam = location.pathname.split('/')[4] === 'liked';
    // const inPlaylist = sectionParam === 'playlists';


    useEffect(() => {
        if (!showDropdown) return;

        const closeDropdown = () => setShowDropdown(false)
        document.addEventListener('click', closeDropdown);

        return () => document.removeEventListener('click', closeDropdown);
    }, [showDropdown])



    const openDropdown = () => setShowDropdown(true);

    const openConfirmMenu = () => setShowConfirm(true);
    const closeConfirmMenu = () => setShowConfirm(false);



    return (
        <div id='library-header'>

            <div className='header-image-container'>
                <img
                    alt='library cover'
                    className='library-header-image'
                    // src={headerUrl}
                />
                <div className='header-title-container'>

                    <h2 className='library-header-title'>{album}</h2>

                    {showDropdown && (
                        <div className='library-list-dropdown album'>
                            <ul>
                                {/* <li onClick={openConfirmMenu}>{inPlaylist ? 'Remove Playlist' : 'Remove Album'}</li>
                                <li onClick={openEditForm}>Edit Details</li> */}
                            </ul>
                        </div>
                    )}

                </div>
            </div>
        </div>
    )
}
