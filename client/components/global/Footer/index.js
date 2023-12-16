import delve from 'dlv';
import CustomLink from '../../shared/CustomLink';
import SocialLogo from '../../shared/SocialLogo';
import Columns from './columns';

const Footer = ({ footer, pageData }) => {
  const label = delve(footer, 'label');
  const terms = delve(footer, 'terms');
  const theme = delve(footer, 'button.theme');
  const socialNetworks = delve(footer, 'socialNetworks');

  return (
    <footer className="bg-white mt-4">
      <div className="max-w-screen-lg xl:max-w-screen-xl mx-auto px-4 sm:px-6 md:px-8 text-gray-400 dark:text-gray-300">
        <Columns
          columns={delve(footer, 'footerColumns')}
          locale={delve(pageData, 'attributes.locale')}
        />
        <div className="pt-4 flex border-t border-gray-200 w-full mx-auto items-center justify-between">
          {socialNetworks &&
            socialNetworks.map((network, index) => (
              <SocialLogo url={delve(network, 'url')} size="20" key={index} />
            ))}
        </div>

        {delve(footer, 'button') && (
          <div className="text-center pt-10 sm:pt-12 font-light flex items-center justify-center">
            <button
              className={`flex-shrink-0 px-4 py-2 text-base font-semibold text-white bg-${theme} rounded-lg shadow-md hover:bg-${theme}-darker focus:outline-none focus:ring-2`}
              type="submit"
            >
              <CustomLink {...delve(footer, 'button.link')} />
            </button>
          </div>
        )}
        <div className='pb-5 flex flex-row justify-between'>
          <div className='flex flex-row'>
            {footer.terms && (
              <CustomLink {...footer.terms} />

            )}
            <div className='pl-5'>
              {footer.privacy && (
                <CustomLink {...footer.privacy} />
              )}
            </div>
          </div>
          {label && (
            label
          )}
        </div>
      </div>
    </footer>
  );
};

Footer.defaultProps = {};

export default Footer;
