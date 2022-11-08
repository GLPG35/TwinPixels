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
                        <div className="keen-slider__slide number-slide1">
                            <div className="platform nintendo">
                                <div className="title">
                                    <div className="icon">
                                        <SiNintendoswitch />
                                    </div>
                                    <span>
                                        Nintendo
                                    </span>
                                </div>
                                <div className="options">
                                    <div className="button">
                                        <button
                                        onClick={() => navigate('/category/consoles?platform=nintendo')}>
                                            Consoles
                                        </button>
                                    </div>
                                    <div className="button">
                                        <button
                                        onClick={() => navigate('/category/games?platform=nintendo')}>
                                            Games
                                        </button>
                                    </div>
                                    <div className="button">
                                        <button
                                        onClick={() => navigate('/category/accesories?platform=nintendo')}>
                                            Accesories
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="keen-slider__slide number-slide2">
                            <div className="platform playstation">
                                <div className="title">
                                    <div className="icon">
                                        <SiPlaystation />
                                    </div>
                                    <span>
                                        PlayStation
                                    </span>
                                </div>
                                <div className="options">
                                    <div className="button">
                                        <button
                                        onClick={() => navigate('/category/consoles?platform=playstation')}>
                                            Consoles
                                        </button>
                                    </div>
                                    <div className="button">
                                        <button
                                        onClick={() => navigate('/category/games?platform=playstation')}>
                                            Games
                                        </button>
                                    </div>
                                    <div className="button">
                                        <button
                                        onClick={() => navigate('/category/accesories?platform=playstation')}>
                                            Accesories
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="keen-slider__slide number-slide3">
                            <div className="platform xbox">
                                <div className="title">
                                    <div className="icon">
                                        <SiXbox />
                                    </div>
                                    <span>
                                        Xbox
                                    </span>
                                </div>
                                <div className="options">
                                    <div className="button">
                                        <button
                                        onClick={() => navigate('/category/consoles?platform=xbox')}>
                                            Consoles
                                        </button>
                                    </div>
                                    <div className="button">
                                        <button
                                        onClick={() => navigate('/category/games?platform=xbox')}>
                                            Games
                                        </button>
                                    </div>
                                    <div className="button">
                                        <button
                                        onClick={() => navigate('/category/accesories?platform=xbox')}>
                                            Accesories
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="keen-slider__slide number-slide4">
                            <div className="platform pc">
                                <div className="title">
                                    <div className="icon">
                                        <RiComputerLine />
                                    </div>
                                    <span>
                                        PC
                                    </span>
                                </div>
                                <div className="options">
                                    <div className="button">
                                        <button
                                        onClick={() => navigate('/category/games?platform=pc')}>
                                            Games
                                        </button>
                                    </div>
                                    <div className="button">
                                        <button
                                        onClick={() => navigate('/category/accesories?platform=pc')}>
                                            Accesories
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
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