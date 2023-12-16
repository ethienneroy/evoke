'use client'
import delve from 'dlv';
import Cta from './cta';
import Logo from './logo';
// import Nav from './nav';
import Link from 'next/link';

import { useRouter } from 'next/router';





//   return (
//     <header className="text-gray-600 bg-white body-font border-b">
//       <div className="container mx-auto flex flex-wrap p-2 flex-col md:flex-row items-center">


//         <Nav
//           links={delve(navigation, 'links')}
//           locale={delve(pageData, 'attributes.locale')}
//         />

//         {delve(navigation, 'rightButton') && (
//           <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>

//             <div className="flex">

//               {/*<LocalSwitch pageData={pageData} type={type} />*/}
//             </div>

//           </div>
//         )}

//       </div>
//     </header>
//   );
// };


import { useState } from 'react'
import { Dialog, Popover } from '@headlessui/react'
import {
  Bars3Icon,
  XMarkIcon
} from '@heroicons/react/24/outline'


const Navigation = ({ pageData, navigation, companyEmail, companyPhone }) => {

  const locale = delve(pageData, 'attributes.locale')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { push } = useRouter();

  const handleMenuClick = (link) => {
    if (link.href.includes('#') && !link.href.includes('.')) {
      document.getElementById(link.href.split('#')[1]).scrollIntoView()
    } else {
      push(link.href)
    }
  }

  const handleMenuClickMobile = (link) => {
    setMobileMenuOpen(false)
    setTimeout(() => {
      handleMenuClick(link)
    }, 500)
  }

  return (
    <header className="bg-white">
      <nav className="mx-auto flex max-w-7xl items-center justify-between lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
          <a href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Evoke Tennis</span>
            <Logo
              button={delve(navigation, 'leftButton')}
              locale={delve(pageData, 'attributes.locale')}
            />

          </a>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <Popover.Group className="hidden lg:flex lg:gap-x-12">

          {navigation.links.map((link, index) => (
            <Link
              href={`${delve(link, 'href')}?lang=${locale || 'en'}`}
              key={`navigationLink-${index}`}
              scroll={false}
              shallow={true}
            >
              <a onClick={() => handleMenuClick(link)} className="text-sm font-semibold leading-6 text-gray-900" key={`link-${index}`} target={delve(link, 'target')}>
                {delve(link, 'label')}
              </a>
            </Link>
          ))}
        </Popover.Group>
        <div className="hidden lg:flex lg:flex-1 flex lg:justify-end">
          <div className='flex flex-col'>
            <a href={`tel:${companyPhone}`} className="mr-2 py-2 px-4 hidden 2xl:block">
              {companyPhone}
            </a>
            <Cta
              href={delve(navigation, 'rightButton.href')}
              target={delve(navigation, 'rightButton.target')}
              label={delve(navigation, 'rightButton.label')}
            />
            <a href={`mailto:${companyEmail}`} className="text-secondary mt-1 inline-flex items-center">
              {companyEmail}
            </a>
          </div>
        </div>
      </nav>
      <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
        <div className="fixed inset-0 z-10" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <a href="/" className="-m-1.5 p-1.5">
              <span className="sr-only">Evoke Tennis</span>
              <Logo
                button={delve(navigation, 'leftButton')}
                locale={delve(pageData, 'attributes.locale')}
              />
            </a>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">

                {navigation.links.map((link, index) => (
                  <Link
                    href={`${delve(link, 'href')}?lang=${locale || 'en'}`}
                    key={`navigationLink-${index}`}
                    scroll={true}
                  >
                    <a onClick={() => handleMenuClickMobile(link)} className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50" key={`link-${index}`}target={delve(link, 'target')}>
                      {delve(link, 'label')}
                    </a>
                  </Link>
                ))}
              </div>
              <div className="py-6 flex flex-column">
                <a href={`tel:${companyPhone}`} className="mr-2 py-2 px-4 hidden 2xl:block">
                  {companyPhone}
                </a>
                <Cta
                  href={delve(navigation, 'rightButton.href')}
                  target={delve(navigation, 'rightButton.target')}
                  label={delve(navigation, 'rightButton.label')}
                />
                <a href={`mailto:${companyEmail}`} className="text-secondary mt-1 inline-flex items-center">
                  {companyEmail}
                </a>
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  )
}
Navigation.defaultProps = {};

export default Navigation;