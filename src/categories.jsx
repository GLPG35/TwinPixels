import './scss/categories.scss'
import 'keen-slider/keen-slider.min.css'
import { SiNintendoswitch, SiPlaystation, SiXbox } from 'react-icons/si'
import { RiComputerLine, RiArrowDropLeftLine, RiArrowDropRightLine } from 'react-icons/ri'
import { useKeenSlider } from 'keen-slider/react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Categories = () => {
    const [currentSlide, setCurrentSlide] = useState(0)
    const [loaded, setLoaded] = useState(false)
    const navigate = useNavigate()
    const [sliderRef, instanceRef] = useKeenSlider({
        loop: true,
        slideChanged(slider) {
            setCurrentSlide(slider.track.details.rel)
        },
        created() {
            setLoaded(true)
        }
    })

    const categoryList = [
        {
            brand: 'Nintendo',
            icon: <SiNintendoswitch />,
            platform: 'nintendo'
        },
        {
            brand: 'PlayStation',
            icon: <SiPlaystation />,
            platform: 'playstation'
        },
        {
            brand: 'Xbox',
            icon: <SiXbox />,
            platform: 'xbox'
        },
        {
            brand: 'PC',
            icon: <RiComputerLine />,
            platform: 'pc'
        }
    ]

    return (
        <div className="categories">
            <div className="container1">
                <h2>Categories</h2>
                <div className="platforms">
                    {loaded &&
                        <>
                            <div className="arrow left" onClick={e => {e.stopPropagation(), instanceRef.current?.prev()}}>
                                <RiArrowDropLeftLine />
                            </div>
                            <div className="arrow right" onClick={e => {e.stopPropagation(), instanceRef.current?.next()}}>
                                <RiArrowDropRightLine />
                            </div>
                        </>
                    }
                    <div ref={sliderRef} className="keen-slider">
                        {categoryList.map(({ brand, icon, platform }, index) => {
                            return (
                                <div key={platform} className={`keen-slider__slide number-slide${index + 1}`}>
                                    <div className='platform'>
                                        <div className="title">
                                            <div className="icon">
                                                {icon}
                                            </div>
                                            <span>
                                                {brand}
                                            </span>
                                        </div>
                                        <div className="options">
                                            <div className="button">
                                                <button
                                                onClick={() => 
                                                    navigate(`/category/console?platform=${platform}`)
                                                }>
                                                    Consoles
                                                </button>
                                            </div>
                                            <div className="button">
                                                <button
                                                onClick={() => 
                                                    navigate(`/category/game?platform=${platform}`)
                                                }>
                                                    Games
                                                </button>
                                            </div>
                                            <div className="button">
                                                <button
                                                onClick={() => 
                                                    navigate(`/category/accesory?platform=${platform}`)
                                                }>
                                                    Accesories
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    {loaded && 
                        <div className="dots">
                            {[...Array(instanceRef.current.track.details.slides.length).keys()].map((idx) => {
                                return (
                                    <div key={idx} className={currentSlide == idx ? 'dot active' : 'dot'}
                                    onClick={() => {instanceRef.current?.moveToIdx(idx)}} >
                                    </div>
                                )
                            })}
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default Categories