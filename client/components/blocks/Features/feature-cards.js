import delve from "dlv";
import { getStrapiMedia } from "../../../utils";
import { useState } from "react";
import ContactForm from '../ContactUs'
import Modal from "../../shared/Modal";

const Cards = ({ cards }) => {
  const [showContactForm, setShowContactForm] = useState(false)
  const [subject, setSubject] = useState(null)

  const handleSelection = (item) => {
    setSubject(item.title)
    console.log(item)
    setShowContactForm(true)
    
  }
  return (
    <div className="sm:flex flex-wrap justify-center text-center gap-8 pt-24 pb-40 items-stretch">
      {cards &&
        cards.map((item, index) => (
          <div
            className={`w-full sm:w-1/2 md:w-1/2 lg:w-1/4 px-4 py-4 bg-white mt-6 shadow-lg rounded-lg`}
            key={`feature-${index}`}
          >
            <div className="flex items-center align-end">
              <span class="group relative">
                <div class="absolute bottom-[calc(100%+0.5rem)] left-[50%] -translate-x-[50%] hidden group-hover:block w-auto">
                  <div class="bottom-full right-0 rounded bg-primary px-4 py-1 text-sm text-white whitespace-nowrap">
                    More infos
                  </div>
                </div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="h-6 w-6 text-gray-500"
                  onClick={() => handleSelection(item)}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </span>
            </div>
            <div className="flex-shrink-0">
              <div className="flex items-center mx-auto justify-center h-24 w-24 rounded-md">
                <img
                  src={getStrapiMedia(delve(item, "image.data.attributes.url"))}
                  alt={delve(item, "image.data.attributes.alternativeText")}
                />
              </div>
            </div>
            <h3 className="text-2xl sm:text-xl text-gray-700 font-semibold py-4">
              {delve(item, "title")}
            </h3>

            <p className="text-md  text-gray-500 py-4">{delve(item, "text")}</p>
          </div>

        ))}
    {showContactForm && <Modal setShowContactForm={setShowContactForm} subject={subject}/>}
    </div>
  );
};

Cards.defaultProps = {};

export default Cards;
