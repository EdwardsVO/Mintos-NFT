import React from "react";
import PropTypes from "prop-types";

function LightStepC(props) {
  return (
    <section className="text-gray-600 body-font bg-gray-100">
      <div className="container px-5 py-24 mx-auto flex flex-wrap">
        <div className="flex relative pb-20 sm:items-center md:w-2/3 mx-auto">
          <div className="h-full w-6 absolute inset-0 flex items-center justify-center">
            <div className="h-full w-1 bg-gray-200 pointer-events-none"></div>
          </div>
          <div
            className={`flex-shrink-0 w-6 h-6 rounded-full mt-10 sm:mt-0 inline-flex items-center justify-center bg-${props.theme}-500 text-white relative z-10 title-font font-medium text-sm`}
          >
            1
          </div>
          <div className="flex-grow md:pl-8 pl-6 flex sm:items-center items-start flex-col sm:flex-row">
            <div
              className={`flex-shrink-0 w-24 h-24 bg-${props.theme}-100 text-${props.theme}-500 rounded-full inline-flex items-center justify-center`}
            >
              <svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="w-12 h-12"
                viewBox="0 0 24 24"
              >
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 9.9-1"></path>
              </svg>
            </div>
            <div className="flex-grow sm:pl-6 mt-6 sm:mt-0">
              <h2 className="font-medium title-font text-gray-900 mb-1 text-xl">
                Instala y utiliza metamask o tu Near wallet
              </h2>
              <p className="leading-relaxed">
                con ellos podrás comprar tus nft e ingresar a tu panel,
              </p>
            </div>
          </div>
        </div>
        <div className="flex relative pb-20 sm:items-center md:w-2/3 mx-auto">
          <div className="h-full w-6 absolute inset-0 flex items-center justify-center">
            <div className="h-full w-1 bg-gray-200 pointer-events-none"></div>
          </div>
          <div
            className={`flex-shrink-0 w-6 h-6 rounded-full mt-10 sm:mt-0 inline-flex items-center justify-center bg-${props.theme}-500 text-white relative z-10 title-font font-medium text-sm`}
          >
            2
          </div>
          <div className="flex-grow md:pl-8 pl-6 flex sm:items-center items-start flex-col sm:flex-row">
            <div
              className={`flex-shrink-0 w-24 h-24 bg-${props.theme}-100 text-${props.theme}-500 rounded-full inline-flex items-center justify-center`}
            >
              <svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="w-12 h-12"
                viewBox="0 0 24 24"
              >
                <g id="_62.check" data-name="62.check">
                  <circle className="cls-1" cx="12" cy="12" r="11" />
                  <polyline className="cls-1" points="6 13 9 16 17 8" />
                </g>
              </svg>
            </div>
            <div className="flex-grow sm:pl-6 mt-6 sm:mt-0">
              <h2 className="font-medium title-font text-gray-900 mb-1 text-xl">
                Selecciona el nft que mas te guste
              </h2>
              <p className="leading-relaxed">
                ve a galería y selecciona tu nft favorito despues procede con la
                compra
              </p>
            </div>
          </div>
        </div>
        <div className="flex relative pb-20 sm:items-center md:w-2/3 mx-auto">
          <div className="h-full w-6 absolute inset-0 flex items-center justify-center">
            <div className="h-full w-1 bg-gray-200 pointer-events-none"></div>
          </div>
          <div
            className={`flex-shrink-0 w-6 h-6 rounded-full mt-10 sm:mt-0 inline-flex items-center justify-center bg-${props.theme}-500 text-white relative z-10 title-font font-medium text-sm`}
          >
            3
          </div>
          <div className="flex-grow md:pl-8 pl-6 flex sm:items-center items-start flex-col sm:flex-row">
            <div
              className={`flex-shrink-0 w-24 h-24 bg-${props.theme}-100 text-${props.theme}-500 rounded-full inline-flex items-center justify-center`}
            >
              <svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="w-12 h-12"
                viewBox="0 0 50 50"
              >
                <g id="Layer_1">
                  <path
                    d="M25,1C11.767,1,1,11.767,1,25s10.767,24,24,24s24-10.767,24-24S38.233,1,25,1z M25,47C12.869,47,3,37.131,3,25
		S12.869,3,25,3s22,9.869,22,22S37.131,47,25,47z"
                  />
                  <path
                    d="M23,13h4c2.757,0,5,2.243,5,5h2c0-3.86-3.141-7-7-7h-1V8h-2v3h-1c-3.859,0-7,3.14-7,7v1c0,3.86,3.141,7,7,7h4
		c2.757,0,5,2.243,5,5v1c0,2.757-2.243,5-5,5h-4c-2.757,0-5-2.243-5-5h-2c0,3.86,3.141,7,7,7h1v3h2v-3h1c3.859,0,7-3.14,7-7v-1
		c0-3.86-3.141-7-7-7h-4c-2.757,0-5-2.243-5-5v-1C18,15.243,20.243,13,23,13z"
                  />
                </g>
              </svg>
            </div>
            <div className="flex-grow sm:pl-6 mt-6 sm:mt-0">
              <h2 className="font-medium title-font text-gray-900 mb-1 text-xl">
                Revende
              </h2>
              <p className="leading-relaxed">
                ¿ya no quieres tu nft? lo puedes revender en tu panel al precio
                que tu decidas.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

LightStepC.defaultProps = {
  theme: "indigo",
};

LightStepC.propTypes = {
  theme: PropTypes.string.isRequired,
};

export default LightStepC;
