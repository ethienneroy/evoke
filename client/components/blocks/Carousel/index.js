import React from "react";
import delve from "dlv";
import CustomLink from '../../shared/CustomLink';

import { getStrapiMedia } from "../../../utils";

const Carousel = ({ slides }) => {
    console.log(slides)
    return (
        <div className="carousel w-full h-screen">
            {slides.map(({description, button, image}, id) => (

                <div id={`slide${id}`} className="carousel-item relative w-full h-full">
                    <img src={getStrapiMedia(delve(image, "data.attributes.url"))} className="w-full object-cover backdrop-brightness-50" />
                    <div class="absolute inset-0 bg-gray-700 opacity-60 rounded-md"></div>
                    <div class="absolute inset-0 flex items-center justify-center">
                        <div className="lg:flex-grow md:w-1/2 my-12 lg:pl-24 md:pl-16 md:mx-auto flex flex-col md:items-start md:text-left items-center text-center">
                            {description && (
                                <h1 className="title-font lg:text-6xl text-5xl mb-4 font-black text-gray-900">
                                    {description}
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
                        <a href={`#slide${id - 1}`} className="btn btn-circle">❮</a>
                        <a href={`#slide${id + 1}`} className="btn btn-circle">❯</a>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Carousel;