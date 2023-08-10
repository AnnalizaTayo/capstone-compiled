import React,{ useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import A from '../../assets/imgs/HOJ-Image-1.jpg';
import B from '../../assets/imgs/HOJ-Image-2.jpg';
import C from '../../assets/imgs/HOJ-Image-3.jpg';
import D from '../../assets/imgs/HOJ-Image-4.jpg';
import E from '../../assets/imgs/HOJ-Image-5.jpg';
import F from '../../assets/imgs/HOJ-Image-6.jpg';
import G from '../../assets/imgs/HOJ-Image-7.jpg';
import H from '../../assets/imgs/HOJ-Image-8.jpg';


// install font awesome thru this https://fontawesome.com/docs/web/use-with/react/

function Gallery() {
        let data = [
            {
                id:1,
                imgSrc: A,
            },
            {
                id:2,
                imgSrc: B,
            },
            {
                id:3,
                imgSrc: C,
            },
            {
                id:4,
                imgSrc: D,
            },
            {
                id:5,
                imgSrc: E,
            },
            {
                id:6,
                imgSrc: F,
            },
            {
                id:7,
                imgSrc: G,
            },
            {
                id:8,
                imgSrc: H,
            }
        ]

        const [model, setModel] = useState(false);
        const [tempimgSrc, setTempImgSrc] = useState('');
        const getImg = (imgSrc) => {
            setTempImgSrc(imgSrc);
            setModel(true);
        } 
        return(
            
            <div className='gallery-wrapper'>
                <div id='h1Gal'>
                    <h1>Gallery</h1>
                </div>
                <div className={model? "model open" : "model"}>
                    <img src={tempimgSrc} alt=''/>
                    <FontAwesomeIcon icon={faCircleXmark} size="lg" id='x'  onClick={()=>setModel(false)}/>
                </div>
                
                <div className='gallery'>
                        {data.map((item, index) =>{
                            return(
                                <div className='images' key={index} onClick={() => getImg(item.imgSrc)} >
                                    <img src={item.imgSrc} alt=''/> 
                                </div>
                            )
                        })}
                </div>
            </div>
        )
    }

export default Gallery;

