import delve from 'dlv';
import { useState } from 'react';

const FeaturesCheck = ({ features }) => {
  const [selectedFeature, setSelectedFeature] = useState(null)

  const handleSelection = (index) => {

    selectedFeature === null ? setSelectedFeature(index) : setSelectedFeature(null)

  }

  return (
    <ul className={`mt-8 md:grid md:grid-cols-${selectedFeature ? '1' : '2'} gap-6`}>
      {features &&
        features.map((feature, index) => {
          if ((selectedFeature >= 0 && selectedFeature === index) || selectedFeature === null) {
            return (
              <li key={`featureCheck-${index}`} className="mt-6 lg:mt-0">
                <div className="flex">
                  <span className="flex-shrink-0 flex items-center justify-center h-6 w-6 rounded-full bg-green-100 text-green-800">
                    <svg
                      className="h-4 w-4"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </span>
                  {/* <span className="ml-4 text-base leading-6 font-medium text-gray-500 dark:text-gray-200">
                {delve(feature, 'text')}
              </span> */}
                  <div className="collapse" onClick={() => handleSelection(index)}>
                    <input type="checkbox" />
                    <div className="collapse-title text-base p-1 text-base leading-6 font-medium text-gray-500 dark:text-gray-200">
                      {delve(feature, 'text')}
                    </div>
                    <div className="collapse-content p-0">
                      <p className=' text-gray-500'>{delve(feature, 'description')}</p>
                    </div>
                  </div>
                </div>
              </li>
            )
          }
        })

      }
    </ul>
  );
};

FeaturesCheck.defaultProps = {};

export default FeaturesCheck;
