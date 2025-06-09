import React from 'react';

interface PropiedadesTarjeta {
  contenido: React.ReactNode;
  claseCSS?: string;
}

const Tarjeta: React.FC<PropiedadesTarjeta> = ({ contenido, claseCSS }) => {
  return (
    <div className={`bg-white rounded-2xl shadow-lg p-6 w-full max-w-sm ${claseCSS || ''}`}>
      {contenido}
    </div>
  );
};

export default Tarjeta;
