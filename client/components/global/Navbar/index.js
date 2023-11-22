import delve from 'dlv';
import Cta from './cta';
import Logo from './logo';
import Nav from './nav';


const Navigation = ({ pageData, navigation, companyEmail, companyPhone }) => {
  return (
    <header className="text-gray-600 bg-white body-font border-b">
      <div className="container mx-auto flex flex-wrap p-2 flex-col md:flex-row items-center">
        <Logo
          button={delve(navigation, 'leftButton')}
          locale={delve(pageData, 'attributes.locale')}
        />

        <Nav
          links={delve(navigation, 'links')}
          locale={delve(pageData, 'attributes.locale')}
        />

        {delve(navigation, 'rightButton') && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
              <a href={`tel:${companyPhone}`} className="mr-2 py-2 px-4 hidden 2xl:block">
                {companyPhone}
              </a>
            <div className="flex">
              <Cta
                href={delve(navigation, 'rightButton.href')}
                target={delve(navigation, 'rightButton.target')}
                label={delve(navigation, 'rightButton.label')}
              />
              {/*<LocalSwitch pageData={pageData} type={type} />*/}
            </div>

            <a href={`mailto:${companyEmail}`} className="text-secondary mt-1 inline-flex items-center">
              {companyEmail}
            </a>
          </div>
        )}

      </div>
    </header>
  );
};

Navigation.defaultProps = {};

export default Navigation;
