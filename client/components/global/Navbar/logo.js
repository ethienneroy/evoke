import delve from 'dlv';
import Link from 'next/link';
import Image from 'next/image'
  
const Logo = ({ button, locale }) => {
  return (
    <Link href={`${delve(button, 'href')}?lang=${locale || 'en'}`}>
      <a className="flex title-font font-medium items-center text-gray-900 md:mb-0">
        <Image
        className='object-contain'
          src="/logo.png"
          height={75}
          width={187.5}
          alt="Logo"/>
      </a>
    </Link>
  );
};

export default Logo;
