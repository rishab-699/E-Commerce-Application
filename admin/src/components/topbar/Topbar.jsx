import React from 'react'
import './topbar.css'
import profile from '../../media/profile_rishab.png'

export default function Topbar() {
  return (
    <div className='topbar'>
      <div className="topbarWrapper">
        <div className="topLeft"><span className="logo">RJSTUDIOS</span></div>
        <div className="topRight">
            <div className="topbarIconContainer">
                <i className="fa-regular fa-bell topbarIcon"></i>
                <span className="topbarIconBadge">2</span>
            </div>
            <div className="topbarIconContainer">
                <i className="fa-solid fa-globe topbarIcon"></i>
                <span className="topbarIconBadge">2</span>
            </div>
            <div className="topbarIconContainer">
                <i className="fa-solid fa-gear topbarIcon"></i>
                <span className="topbarIconBadge">2</span>
            </div>
            <img src={profile} alt="" className="topAvatar" />
        </div>
      </div>
    </div>
  )
}
