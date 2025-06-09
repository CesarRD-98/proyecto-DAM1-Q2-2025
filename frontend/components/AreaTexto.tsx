import React from 'react';

interface PropiedadesAreaTexto extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  textoGuia?: string;
  claseCSS?: string;
}

const AreaTexto: React.FC<PropiedadesAreaTexto> = ({ textoGuia, claseCSS, ...otrasProps }) => {
  return (
    <textarea
      placeholder={textoGuia}
      className={`bg-blue-50 border-none rounded-lg p-4 text-gray-600 placeholder-gray-500 w-full min-h-[120px] resize-none mb-3 ${claseCSS || ''}`}
      {...otrasProps}
    ></textarea>
  );
};

export default AreaTexto;
