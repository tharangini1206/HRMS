import puppeteer from "puppeteer";
import fs from "fs";
import path from "path";

/**
 * Generate Payslip PDF
 */

export const generatePDF = async (

  html: string,

  fileName: string

): Promise<string> => {

  /**
   * Temp Folder
   */

  const tempFolder = path.join(

    process.cwd(),

    "temp"

  );

  if (!fs.existsSync(tempFolder)) {

    fs.mkdirSync(tempFolder, {

      recursive: true

    });

  }

  /**
   * PDF Path
   */

  const pdfPath = path.join(

    tempFolder,

    `${fileName}.pdf`

  );

  /**
   * Launch Browser
   */

  const browser = await puppeteer.launch({

    headless: true

  });

  try {

    const page = await browser.newPage();

    /**
     * HTML
     */

    await page.setContent(html);

    /**
     * Generate PDF
     */

    await page.pdf({

      path: pdfPath,

      format: "A4",

      printBackground: true,

      margin: {

        top: "20px",

        right: "20px",

        bottom: "20px",

        left: "20px"

      }

    });

  } finally {

    await browser.close();

  }

  return pdfPath;

};