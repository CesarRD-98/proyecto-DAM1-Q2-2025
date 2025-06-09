import React from 'react';

interface PropiedadesInterruptor {
  estadoActivado: boolean;
  alCambiar: () => void;
  claseCSS?: string;
}

const Interruptor: React.FC<PropiedadesInterruptor> = ({ estadoActivado, alCambiar, claseCSS }) => {
  return (
    <button
      onClick={alCambiar}
      className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors duration-200 ease-in-out focus:outline-none ${
        estadoActivado ? 'bg-blue-500' : 'bg-gray-200'
      } ${claseCSS || ''}`}
      role="switch"
      aria-checked={estadoActivado}
    >
      <span
        className={`inline-block w-4 h-4 transform rounded-full bg-white transition-transform duration-200 ease-in-out ${
          estadoActivado ? 'translate-x-6' : 'translate-x-1'
        }`}
      />
    </button>
  );
};

export default Interruptor;
