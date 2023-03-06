import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

const useDynamicTranslation = () => {
  const { i18n } = useTranslation();

  const dt = useCallback(
    (text) => {
      if (!text.find) return text;

      if (text.length === 0) return '';

      const translatedText = text.find(
        (translation) => translation.language === i18n.languages[0]
      );
      if (!translatedText) return text[0].value;

      return translatedText.value;
    },
    [i18n.languages]
  );

  return {
    dt,
  };
};

export { useDynamicTranslation };
