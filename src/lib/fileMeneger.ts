import "server-only";

import ImageKit from "imagekit";

const imageKit = new ImageKit({
  publicKey: process.env.IMAGE_KIT_PUBLIC_KEY!,
  privateKey: process.env.IMAGE_KIT_PRIVET_KEY!,
  urlEndpoint: process.env.IMAGE_KIT_URL!,
});

import { join } from "path";
import "server-only";
import sharp from "sharp";

const basePath = "/ok";
const ONEHALF = 1.5 * 1024 * 1024; // max file limit 1.5 mb

/**
 *
 * this function auto file compress if image greater than 2 mb
 * @param file, fileName? , folder? = '/' , isCompressible? = true
 * @returns
 *  url: res.url,
 *  fileId: res.fileId,
 *
 */

export const fileUpload = async ({
  file,
  folder = "/",
  isCompressible = true,
  fileName,
}: {
  file: File;
  fileName?: string;
  folder?: string;
  isCompressible?: boolean;
}) => {
  fileName = fileName ?? `${Date.now()}_${file.name}`;
  const buffer = await file.arrayBuffer();

  let fileBuffer = Buffer.from(buffer);

  if (
    buffer.byteLength > ONEHALF &&
    isCompressibleImage(file.name) &&
    isCompressible
  ) {
    try {
      const compressedBuffer = await compressImageServer(fileBuffer);
      fileBuffer = Buffer.from(compressedBuffer);

      console.log(
        "in server original image size = ",
        buffer.byteLength / (1024 * 1024),
      );
      console.log(
        "in server compressed image size = ",
        fileBuffer.byteLength / (1024 * 1024),
      );
    } catch (error) {
      console.log("Error compressing image:", error);
    }
  }
  const upPath = join(basePath, folder).toString().replace(/\\/g, "/");

  const res = await imageKit.upload({
    file: fileBuffer,
    fileName: fileName,
    folder: upPath,
  });
  return {
    url: res.url,
    fileId: res.fileId,
  };
};

const isCompressibleImage = (filename: string): boolean => {
  const imageExtensions = [".jpg", ".jpeg", ".png", ".webp", ".gif", ".tiff"];
  const ext = filename.substring(filename.lastIndexOf(".")).toLowerCase();
  return imageExtensions.includes(ext);
};

export const compressImageServer = async (
  buffer: Buffer,
  quality?: 80,
): Promise<Buffer> => {
  return await sharp(buffer)
    .resize({ width: 2160, fit: "inside", withoutEnlargement: true })
    .webp({ quality: quality })
    .toBuffer();
};

export const deleteFile = async (fileId: string) => {
  if (!fileId) return false;
  try {
    await imageKit.deleteFile(fileId);
    return true;
  } catch (error) {
    console.log("Error deleting file:", error);
    return false;
  }
};
