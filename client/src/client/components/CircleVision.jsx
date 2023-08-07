export default function CircleVision(props) {
    return (
        <div className={props.active === 'inactive' ? 'about-circle-container-inactive' : 'about-circle-container'}>
            <div className='about-text-container'>
                <h1 className="about-circle-text">Vision</h1>
            </div>
            {props.active === 'active' ?
                <div className="about-overview-container">
                    <div className='background-overlay'></div>
                    <div className="about-overview-text">
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sapiente consequuntur iste excepturi repellat quisquam illo sequi cum eveniet voluptatibus dolorum, nam in, eius rem quo quos fugit praesentium illum suscipit.
                    </div>
                </div>
                :
                    ''
            }
        </div>
    )
}