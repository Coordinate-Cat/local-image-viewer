import fs from "fs";
import path from "path";

// 画像ファイルの情報を格納するための型
export interface ImageInfo {
  fileName: string;
  filePath: string;
}

export function getImagesList(): ImageInfo[] {
  const imagesDirectory = path.join(process.cwd(), "public/images");
  const fileNames = fs.readdirSync(imagesDirectory);

  return fileNames.map((fileName) => ({
    fileName: fileName.replace(/\.[^/.]+$/, ""),
    filePath: `/images/${fileName}`,
  }));
}
