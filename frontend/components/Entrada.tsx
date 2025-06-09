import React from 'react';

interface PropiedadesEntrada extends React.InputHTMLAttributes<HTMLInputElement> {
  textoGuia?: string;
  claseCSS?: string;
}

const Entrada: React.FC<PropiedadesEntrada> = ({ textoGuia, claseCSS, ...otrasProps }) => {
  return (
    <input
      placeholder={textoGuia}
      className={`bg-blue-50 border-none rounded-lg p-4 text-gray-600 placeholder-gray-500 w-full mb-3 ${claseCSS || ''}`}
      {...otrasProps}
    />
  );
};

export default Entrada;
