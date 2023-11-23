'use client'
import delve from "dlv";
import { getStrapiMedia } from "../../../utils";
import { useState } from "react";
import ContactForm from '../ContactUs'
import Modal from "../../shared/Modal";
import { CKEditor } from '@ckeditor/ckeditor5-react';

import 'github-markdown-css';
import styles from '../../pages/blog/ArticleContent/ArticleContent.module.css';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Transition } from "@headlessui/react";

const Cards = ({ cards }) => {
  const [showContactForm, setShowContactForm] = useState(false)
  const [subject, setSubject] = useState(null)
  const [selectedCard, setSelectedCard] = useState(null)

  const handleIt = (item) => {
    setSelectedCard(item)
    console.log('its at', window.document.getElementById('features-section').getBoundingClientRect())
    
    // window.location.hash = item !== null ? '#features-section' : ''
    window.scrollTo({top: Math.abs(window.document.getElementById('features-section').offsetTop), behavior: 'smooth'})
  }



  const handleSelection = (item) => {
    setSubject(item.title)
    console.log(item)
    setShowContactForm(true)

  }

  if (selectedCard) {

    return (
      <div className="relative overflow-hidden">
        <button onClick={() => setSelectedCard(null)} className="absolute top-0 right-0 p-4">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6 text-gray-500">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <div className="pb-80 pt-16 sm:pb-40 sm:pt-24 lg:pb-48 lg:pt-40">
          <div className="relative mx-auto max-w-7xl px-4 sm:static sm:px-6 lg:px-8">
            <div className="sm:max-w-lg">
              <Card item={selectedCard} handleSelection={handleSelection} isFocused setSelectedCard={setSelectedCard} />
            </div>
            <div className="mt-10 shadow-lg rounded-lg transition-opacity ease-in duration-700 opacity-100 ">
              <div
                aria-hidden="true"
                className="pointer-events-none lg:absolute lg:inset-y-0 lg:mx-auto lg:w-full lg:max-w-7xl"
              >
                <div className="markdown-body ck-content sm:relative sm:pt-15 lg:absolute transform lg:w-1/2 sm:left-1/2 sm:translate-x-8 lg:left-1/2 lg:top-1/4 lg:translate-x-6 shadow-lg rounded-lg  animate-fade-in-down">
                  <div className={styles['ck-no-border']}>
                    <CKEditor
                      editor={ClassicEditor}
                      onReady={(editor) => {
                        editor.ui.view.toolbar.element.remove();
                      }}
                      data={delve(selectedCard, 'informations') ? selectedCard.informations.replaceAll(
                        '"/uploads',
                        `"${process.env.NEXT_PUBLIC_API_URL}/uploads`
                      ) : null}
                      disabled={true}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )


  }


  return (
    <div className="sm:flex flex-wrap justify-center text-center gap-8 pt-24 pb-40 items-stretch">
      {cards &&
        cards.map((item, index) => (
          <Card item={item} setSelectedCard={handleIt} handleSelection={handleSelection} index={index} />

        ))}
      {showContactForm && <Modal setShowContactForm={setShowContactForm} subject={subject} />}
    </div>
  );
};

const Card = ({ item, setSelectedCard, handleSelection, index, isFocused = false }) => {
  const size = isFocused ? 'full' : '1/2'
  const sizeLg = isFocused ? 'full' : '1/4'
  return (
    <Transition
      show={true}
      as="article"
      unmount={false}
      className={`w-full sm:w-${size} md:w-${size} lg:w-${sizeLg} px-4 py-4 bg-white mt-6 shadow-lg rounded-lg animate-fade-in-down`}
      enter="transition ease-[cubic-bezier(0.68,-0.3,0.32,1)] duration-700 transform order-first"
      enterFrom="opacity-0 -translate-y-8"
      enterTo="opacity-100 translate-y-0"
      leave="transition ease-[cubic-bezier(0.68,-0.3,0.32,1)] duration-300 transform absolute"
      leaveFrom="opacity-100 translate-y-0"
      leaveTo="opacity-0 translate-y-12"
      beforeEnter={() => heightFix()}
      an
    >
      <div
        key={`feature-${index}`}
        onClick={() => setSelectedCard(isFocused ? null : item)}
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
    </Transition>
  )
}

Cards.defaultProps = {};

export default Cards;
