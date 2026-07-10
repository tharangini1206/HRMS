import puppeteer from "puppeteer";
import fs from "fs";
import path from "path";

/**
 * ==========================================
 * Generate Payslip PDF
 * ==========================================
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

  let browser;

  try {

    /**
     * Launch Browser
     */

    browser = await puppeteer.launch({

      headless: true,

      args: [

        "--no-sandbox",

        "--disable-setuid-sandbox"

      ]

    });

    const page = await browser.newPage();

    /**
     * Load HTML
     */

    await page.setContent(html);

    /**
     * Wait for page to finish loading
     */

    await page.waitForNetworkIdle();

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

    return pdfPath;

  } catch (error: any) {

    console.error("PDF Generation Error:", error);

    throw error;

  } finally {

    if (browser) {

      await browser.close();

    }

  }

};