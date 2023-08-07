import { FaFacebookF , FaMapMarkerAlt } from 'react-icons/fa';
import { IoIosMail } from 'react-icons/io';
import { BsTelephoneFill } from 'react-icons/bs';

export default function ClientFooter() {
    return (
        <footer className='footer-container'>
            <div className ='footer-img-logo'>
                <img src={'https://drive.google.com/uc?id=1n-OQWB1GwH5WDWfOct_5xkT_5Xs3LQtH'} alt="HouseofJ-Logo"/>
            </div>
            
            <div className="center">
                <h1>Connect with us</h1>
                <div className='footer-icons'>
                    <FaFacebookF/>
                    <IoIosMail/>
                    <BsTelephoneFill/>
                    <FaMapMarkerAlt/>
                </div>
            </div>
            
            <div className="footer-newsletter">
                <div className='newsletter'>
                    <h1> Newsletter </h1>
                    <p className="footer-newsletter-text">
                        Be the first to know about exciting new designs and much more!
                    </p>
                    <div className="footer-email">
                        <form action="">
                            <input type='email' id='email'/>
                            <button className='footer-subscribe'>Subscribe</button>
                        </form>
                    </div>
                </div>
            </div>
        </footer>
    )
}