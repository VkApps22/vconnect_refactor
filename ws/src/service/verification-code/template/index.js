import fs from 'fs';
import path from 'path';
import handlebars from 'handlebars';

const buildBody = async ({ fileName, data }) => {
  const content = await fs.promises.readFile(path.resolve(__dirname, fileName));
  const template = handlebars.compile(content.toString());
  return template(data);
};

const templates = {
  en: {
    subject: 'VConnect – Platform Password Reset',
    fileName: 'en.html.hbs',
  },
  es: {
    subject: 'Restablecimiento de Contraseña de VConnect – Platform',
    fileName: 'es.html.hbs',
  },
  pt: {
    subject: 'Redefinição de Senha da VConnect – Platform',
    fileName: 'pt.html.hbs',
  },
};

const createTemplate = async ({ language, data }) => {
  const template = templates[language] || templates.pt;

  return {
    subject: template.subject,
    body: await buildBody({
      fileName: template.fileName,
      data,
    }),
  };
};

export default createTemplate;
