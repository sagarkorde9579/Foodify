import React from 'react'
import './AppDownload.css'
import { assets } from '../../assets/assets'
const AppDownload = () => {
  return (
    <div className='app-download' id='app-download'>
        <p>For Better Experience Download <br />Foodify App</p>
        <div className="app-download-platforms">
           <a target='_blank' href=""><img src={assets.play_store} alt="" /></a> 
           <a target='_blank' href="https://play.google.com/store/apps/details?id=com.application.zomato"><img src={assets.app_store} alt="" /></a> 
        </div>

    </div>
  )
}

export default AppDownload