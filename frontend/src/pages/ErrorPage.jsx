import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Error = () => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col justify-center items-center p-10">
      <h1 className="text-center md:text-3xl text-xl text-white font-extrabold">
        {t('app.notFound')}
      </h1>
      <Link
        to="/"
        className="text-slate-400 underline mt-6"
      >
        {t('app.back')}
      </Link>
    </div>
  );
};

export default Error;
