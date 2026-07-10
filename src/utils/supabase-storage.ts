import fs from "fs";
import { supabase } from "../config/supabase";

const BUCKET_NAME = "payslips";

/**
 * ==========================================
 * Upload Payslip To Supabase Storage
 * ==========================================
 */

export const uploadPayslipToStorage = async (

  pdfPath: string,

  fileName: string

): Promise<string> => {

  /**
   * Read PDF
   */

  const fileBuffer = fs.readFileSync(

    pdfPath

  );

  /**
   * Upload PDF
   */

  const {

    data,

    error

  } = await supabase.storage

    .from(BUCKET_NAME)

    .upload(

      `${fileName}.pdf`,

      fileBuffer,

      {

        contentType:

          "application/pdf",

        upsert: true

      }

    );

  if (error) {

    console.log(error);
    throw error;

  }

  /**
   * Remove Local File
   */

  if (

    fs.existsSync(pdfPath)

  ) {

    fs.unlinkSync(

      pdfPath

    );

  }

  return data.path;

};

/**
 * ==========================================
 * Generate Signed URL
 * ==========================================
 */

export const getPayslipSignedUrl = async (

  filePath: string

): Promise<string> => {

  const {

    data,

    error

  } = await supabase.storage

    .from(BUCKET_NAME)

    .createSignedUrl(

      filePath,

      60 * 15

    );

  if (error) {

    throw new Error(

      error.message

    );

  }

  return data.signedUrl;

};

/**
 * ==========================================
 * Delete Payslip
 * ==========================================
 */

export const deletePayslipFromStorage = async (

  filePath: string

): Promise<void> => {

  const {

    error

  } = await supabase.storage

    .from(BUCKET_NAME)

    .remove([

      filePath

    ]);

  if (error) {

    throw new Error(

      error.message

    );

  }

};