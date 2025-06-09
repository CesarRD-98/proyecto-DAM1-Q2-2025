import React from 'react';

interface PropiedadesBoton extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  alClic: () => void;
  claseCSS?: string;
}

const Boton: React.FC<PropiedadesBoton> = ({ children, alClic, claseCSS, ...otrasProps }) => {
  return (
    <button
      onClick={alClic}
      className={`w-full bg-blue-500 hover:bg-blue-600 text-white rounded-lg py-4 text-lg font-medium transition-colors duration-200 ${claseCSS || ''}`}
      {...otrasProps}
    >
      {children}
    </button>
  );
};

export default Boton;
