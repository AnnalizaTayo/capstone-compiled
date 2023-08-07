//import logo from "../assets/imgs/houseOfJLogoBlack.png"
//import "../assets/css/Circles.css"

export default function AboutOverview(props) {
    return (
        <div className={props.active === 'inactive' ? 'about-circle-container-inactive' : 'about-circle-container'}>
            <div className="about-text-container">
                <img src = {'https://drive.google.com/uc?id=1n-OQWB1GwH5WDWfOct_5xkT_5Xs3LQtH'} alt="logo" className="about-logo-img"/>
            </div>
            {props.active === 'active' ?
                <div className="about-overview-container">
                    <div className='background-overlay'></div>
                    <br/>
                    <h1 className="about-overview-header">
                        Who We Are
                    </h1>
                    <div className="about-overview-logo-text">
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sapiente consequuntur iste excepturi repellat quisquam illo sequi cum eveniet voluptatibus dolorum, nam in, eius rem quo quos fugit praesentium illum suscipit.
                    </div>
                </div>
                : ''
            }
        </div>
        
    )
}