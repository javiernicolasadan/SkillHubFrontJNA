import { FaInstagram, FaFacebookSquare, FaTwitterSquare, FaYoutube } from 'react-icons/fa'

export default function Footer() {
  return (
    <footer>
      <div className="mediaDiv">
        <FaInstagram className="mediaIcon"/>
        <FaFacebookSquare className="mediaIcon" />
        <FaTwitterSquare className="mediaIcon"/>
        <FaYoutube className="mediaIcon"/>
      </div>
      <div className="disclaimer">
        <p>Terms of use</p>
        <p>Cookies policy</p>
        <p>Privacy policy</p>
      </div>
      <span>Copyright © 2023 | Elisa Exposito & Javier Adan</span>
    </footer>
  )
}
