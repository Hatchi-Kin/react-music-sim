"use client";

import {TbPlaylist} from "react-icons/tb";
import {AiOutlinePlus} from "react-icons/ai";

const Library = () => {
        const OnClick = () => {
        console.log('Library Clicked');
    }
    return (
        <div className={'flex flex-col '}>
            <div className={'flex items-center justify-between px-5 pt-4 '}>
                <div className={'inline-flex items-center gap-x-2'}>
                    <TbPlaylist className={'text-neutral-400'} size={26}/>
                    <p className={'text-neutral-400 font-medium text-md'}>Your Library</p>
                </div>
                <AiOutlinePlus className={'text-neutral-400 cursor-pointer hover:text-white transition'} size={26} onClick={OnClick}/>
            </div>
            <div className={'flex flex-col gap-y-4 px-5 py-4'}>
                <p className={'text-neutral-400 font-medium text-md'}>Made for you</p>
                <p className={'text-neutral-400 font-medium text-md'}>Recently Played</p>
                <p className={'text-neutral-400 font-medium text-md'}>Liked Songs</p>
                <p className={'text-neutral-400 font-medium text-md'}>Albums</p>
                <p className={'text-neutral-400 font-medium text-md'}>Artists</p>
                <p className={'text-neutral-400 font-medium text-md'}>Podcasts</p>
            </div>
        </div>
    )
}

export default Library;
