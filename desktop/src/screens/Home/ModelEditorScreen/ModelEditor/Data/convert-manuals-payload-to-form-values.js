import { env } from '../../../../../config';

const recoverManual = ({ response, language, t }) => {
  const manualResponse = response.find(
    (manual) => manual.language === language
  );
  return manualResponse
    ? {
        hasManual: true,
        manual: {
          file: {
            name: t('view-manual'),
            link: `${env.HOST_ADDRESS}/v1/public/manual-file?manualId=${manualResponse._id}`,
          },
          language,
          sections: manualResponse.sections,
        },
      }
    : {
        hasManual: false,
        manual: {
          file: undefined,
          language,
          sections: [],
        },
      };
};

export default ({ response, t }) => {
  const englishManual = recoverManual({ response, language: 'en', t });
  const portugueseManual = recoverManual({ response, language: 'pt', t });
  const spanishManual = recoverManual({ response, language: 'es', t });

  return {
    manuals: [portugueseManual, englishManual, spanishManual],
  };
};
