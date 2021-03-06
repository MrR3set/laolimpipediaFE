import React from 'react';
import { ReactComponent as InstagramIcon } from '../../Assets/instagram.svg'
import { ReactComponent as MailOutlineIcon } from '../../Assets/gmail.svg'
import { ReactComponent as ArrowUpwardIcon } from '../../Assets/down.svg'
import { ReactComponent as TwitchIcon } from '../../Assets/twitch.svg'
import "./Footer.scss"


function Footer() {
  const handleScroll = () => {
    window.scrollTo({top:0,behavior:"smooth"});
  }

  return (
    <div className="footer-wrapper">
      {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
      <a className="topscroll" onClick={handleScroll} >Volver arriba<ArrowUpwardIcon/></a>
      <div className="cc-license">
        <a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/">
          <img alt="Creative Commons License" src="https://i.creativecommons.org/l/by-nc-sa/4.0/88x31.png" />
        </a> 
        <p>Licensed by <a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/">Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License</a></p>

       
      </div>

      <div className="social">
        <a href="mailto:olimpipedia@gmail.com" ><MailOutlineIcon/></a>
        <a href="https://instagram.com/laolimpipedia" ><InstagramIcon/></a>
		<a href="https://www.twitch.tv/laolimpipedia" ><TwitchIcon/></a>
      </div>
    </div>
  );
}

export default Footer;