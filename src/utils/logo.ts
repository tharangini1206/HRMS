import fs from "fs";
import path from "path";

export const getCompanyLogo = () => {

  const logoPath = path.join(
    process.cwd(),
    "src",
    "assets",
    "images",
    "cofomo-tech.jpeg"
  );

  const logo = fs.readFileSync(logoPath);

  return `data:image/png;base64,${logo.toString("base64")}`;

};