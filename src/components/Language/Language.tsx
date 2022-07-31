import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import useLocalStorage from 'use-local-storage';

function Segment({ title, selected, handleClick }: { title: string; selected: boolean; handleClick: () => void }) {
  return (
    <div onClick={handleClick} className={selected ? 'segment selected' : 'segment'}>
      {title}
    </div>
  );
}

export default function Language() {
  const { i18n } = useTranslation();
  const [i18nLang, setI18nLang] = useLocalStorage('i18n-lang', 'ko');

  useEffect(() => {
    i18n.changeLanguage(i18nLang);
  }, [i18n, i18nLang]);

  return (
      <div className="languages-panel">
        <Segment title="한국어" selected={i18nLang === 'ko'} handleClick={() => setI18nLang('ko')} />
        <Segment title="English" selected={i18nLang === 'en'} handleClick={() => setI18nLang('en')} />
      </div>
  );
}
