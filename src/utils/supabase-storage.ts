import fs from "fs";
import path from "path";
import { supabase } from "../config/supabase";

const BUCKET_NAME = "payslips";

/**
 * Upload PDF to Supabase Storage
 */

export const uploadPayslipToStorage = async (

  pdfPath: string,

  fileName: string

) => {

  /**
   * Read PDF
   */

  const fileBuffer = fs.readFileSync(pdfPath);

  /**
   * Upload
   */

  const { data, error } =
    await supabase.storage
      .from(BUCKET_NAME)
      .upload(

        `${fileName}.pdf`,

        fileBuffer,

        {

          contentType: "application/pdf",

          upsert: true

        }

      );

  if (error) {

    throw new Error(error.message);

  }

  /**
   * Remove Temp File
   */

  if (fs.existsSync(pdfPath)) {

    fs.unlinkSync(pdfPath);

  }

  return data.path;

};

/**
 * Get Signed URL
 */

export const getPayslipSignedUrl = async (

  filePath: string

) => {

  const { data, error } =
    await supabase.storage
      .from(BUCKET_NAME)
      .createSignedUrl(

        filePath,

        60 * 15

      );

  if (error) {

    throw new Error(error.message);

  }

  return data.signedUrl;

};