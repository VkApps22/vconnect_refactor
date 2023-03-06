#!/usr/bin/env node

const files = {
  pdfJs: "pdf.min.js",
  pdfWorker: "pdf.worker.min.js",
  viewerCss: "viewer.css",
  viewerHtml: "viewer.html",
  viewerJs: "viewer.js",
  loadingIconGif: "images/loading-icon.gif",
  shadowPng: "images/shadow.png",
};

const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const encoding = { encoding: "utf8" };

const writeFile = ({ path, content }) => {
  if (fs.existsSync(path)) {
    fs.unlinkSync(path);
  }
  fs.writeFileSync(path, content, encoding);
};

const generateContainers = () => {
  Object.keys(files).forEach((key) => {
    let rootDir = path.join(__dirname, "./src/");
    let fileName = files[key];
    let originPath = path.join(rootDir, fileName);
    let destinationPath = path.join(
      __dirname,
      `../mobile/src/screens/Details/PdfViewerScreen/PdfViewer/generated/${key}Container.js`
    );

    let readAsBase64 = (path) => fs.readFileSync(path, 'base64');

    let bundleBase64 = readAsBase64(originPath);
    let md5 = crypto.createHash("md5").update(bundleBase64).digest("hex");

    let bundleContainerFileContent = `
  const bundle = '${bundleBase64}';
  export function getBundle() {
    return bundle;
  }
  export function getBundleMd5() {
    return '${md5}';
  }
  export function getFileName() {
    return '${fileName}';
  }
  `;
    writeFile({ path: destinationPath, content: bundleContainerFileContent });
  });
};

const generateIndex = () => {
  let importsContent = Object.keys(files).map(
    (key) => `import * as ${key} from './${key}Container.js';`
  );
  let contents = `${importsContent.join("\n")}

export default [ ${Object.keys(files)
    .map((key) => key)
    .join(", ")} ];
`;
  let indexPath = path.join(
    __dirname,
    `../mobile/src/screens/Details/PdfViewerScreen/PdfViewer/generated/index.js`
  );
  writeFile({ path: indexPath, content: contents });
};

generateContainers();
generateIndex();
