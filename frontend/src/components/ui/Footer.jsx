import { Link } from 'react-router-dom'
import { FaFacebook } from 'react-icons/fa6'
import { FaInstagram } from 'react-icons/fa6'
import { FaTwitter } from 'react-icons/fa6'

const Footer = () => {
  return (
    <footer className="py-3" style={{ backgroundColor: '#6050DC', color: 'white'}}>
        <div className="container text-center">

            <div className="mb-2">
              <a href="https://facebook.com" className="text-white mx-2">
                <FaFacebook />
              </a>
              <a href="https://twitter.com" className="text-white mx-2">
                <FaTwitter />
              </a>
              <a href="https://instagram.com"  className="text-white mx-2">
                <FaInstagram />
              </a>
            </div>

            <p className="small mb-0">&copy; 2025 JoBiju Mart</p>
        </div>
    </footer>
  )
}

export default Footer