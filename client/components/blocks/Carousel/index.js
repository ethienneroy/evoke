'use client'

import React, { useEffect, useRef, useState, useMemo } from "react";
import delve from "dlv";
import CustomLink from '../../shared/CustomLink';

import { getStrapiMedia } from "../../../utils";

// import { useRouter } from 'next/router'

function useOnScreen(ref) {

    const [isIntersecting, setIntersecting] = useState(false)

    const observer = useMemo(() => new IntersectionObserver(
        ([entry]) => setIntersecting(entry.isIntersecting)
    ), [ref])


    useEffect(() => {
        observer.observe(ref.current)
        return () => observer.disconnect()
    }, [])

    return isIntersecting
}
const Carousel = ({ slides }) => {
    // const router = useRouter()
    // useEffect(() => {
    const ref = useRef(null)
    const myInterval = useRef();

    const isVisible = useOnScreen(ref)

    const intervalFunction = () => {
        if (typeof window !== 'undefined') {
            const slide = window.location.hash && window.location.hash.split('#slide').length ? window.location.hash.split('#slide')[1] : '0'
            const newSlide = Number(slide) + 1 > slides.length - 1 ? 0 : Number(slide) + 1
            window.location.hash = `#slide${newSlide}`
        }
    }
    let intervalId;

    useEffect(() => {
        // You had this line to start timer on load
        // but you can just set the initial state to `true`
        //setFlag(true);
        // Clear time on component dismount
        return () => clearInterval(myInterval.current);
      }, []);

    function startInterval() {
        myInterval.current = setInterval(intervalFunction, 5000);
    }
    function stopInterval() {
        clearInterval(myInterval.current);
        // intervalId.current = null;

    }

    const previous = (id) => {
        window.location.hash = `#slide${id - 1}`

        // interval = setInterval(intervalFunction, 5000)
        stopInterval()
        startInterval()
    }

    const next = (id) => {
        window.location.hash = `#slide${id + 1}`

        // clearInterval(interval)
        // interval = setInterval(intervalFunction, 5000)
        stopInterval()
        startInterval()
    }

    useEffect(() => {
        if (!isVisible) {
            stopInterval()
        } else {
            startInterval()
        }
    }, [isVisible])

    return (
        <div className="carousel w-full h-screen" ref={ref}>
            {slides.map(({ description, button, image, title }, id) => (

                <div id={`slide${id}`} className="carousel-item relative w-full h-full">
                    <img src={getStrapiMedia(delve(image, "data.attributes.url"))} className="w-full object-cover backdrop-brightness-50" />
                    <div class="absolute inset-0 bg-gray-700 opacity-60 rounded-md"></div>
                    <div class="absolute inset-0 flex items-center justify-center">
                        <div className="lg:flex-grow md:w-1/2 my-12 lg:pl-24 md:pl-16 md:mx-auto flex flex-col md:items-start md:text-left items-center text-center">
                            {title && (
                                <h1 className="title-font lg:text-6xl text-5xl mb-4 font-black text-gray-900">
                                    {title}
                                </h1>
                            )}

                            {description && <p className="mb-8 px-2 leading-relaxed">{description}</p>}

                            <div className="block space-y-3 md:flex md:space-y-0 space-x-2">

                                <button
                                    key={`heroButton-${id}`}
                                    className={`inline-block text-${delve(
                                        button,
                                        'theme'
                                    )}-text bg-${delve(
                                        button,
                                        'theme'
                                    )} border-0 py-2 px-6 focus:outline-none hover:bg-${delve(
                                        button,
                                        'theme'
                                    )}-darker rounded-full shadow-md hover:shadow-md text-lg`}
                                >
                                    <CustomLink {...delve(button, 'link')} />
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                        <button onClick={() => previous(id)} className="btn btn-circle">❮</button>
                        <button onClick={() => next(id)} className="btn btn-circle">❯</button>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Carousel;