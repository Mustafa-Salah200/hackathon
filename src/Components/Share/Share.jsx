/* eslint-disable react/prop-types */
import './Share.css'
import facebook from './images/Facebook.svg'
import instagram from './images/instagram.svg'
import discord from './images/Discord.svg'
import whatsapp from './images/whatsapp.svg'
import twitter from './images/twitter.svg'

const Share = ({setShowPage}) => {
  return (
    <div className='share'>
        <div className="header">
        <p className="back" onClick={() => setShowPage()}>
          <svg
            width="800px"
            height="800px"
            viewBox="0 0 1024 1024"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill="#000000"
              d="M195.2 195.2a64 64 0 0 1 90.496 0L512 421.504 738.304 195.2a64 64 0 0 1 90.496 90.496L602.496 512 828.8 738.304a64 64 0 0 1-90.496 90.496L512 602.496 285.696 828.8a64 64 0 0 1-90.496-90.496L421.504 512 195.2 285.696a64 64 0 0 1 0-90.496z"
            />
          </svg>
        </p>
        <h2>Share</h2>
      </div>
      <h3>Would you like to share our App with your friends?</h3>
      <div className="icons">
        <img src={whatsapp} alt="" />
        <img src={facebook} alt="" />
        <img src={twitter} alt="" />
        <img src={instagram} alt="" />
        <img src={discord} alt="" />
      </div>
    </div>
  )
}

export default Share