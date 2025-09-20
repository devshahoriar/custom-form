"use server";

import { fileUpload, deleteFile } from "@/lib/fileMeneger";

export async function uploadFileAction(formData: FormData, folder?: string) {
  try {
    const file = formData.get("file") as File;

    if (!file) {
      throw new Error("No file provided");
    }

    const result = await fileUpload({
      file,
      folder: folder || "/",
      isCompressible: true,
    });

    return {
      success: true,
      data: result,
    };
  } catch (error) {
    console.error("Upload error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Upload failed",
    };
  }
}

export async function deleteFileAction(fileId: string) {
  try {
    const result = await deleteFile(fileId);

    return {
      success: result,
      message: result ? "File deleted successfully" : "Failed to delete file",
    };
  } catch (error) {
    console.log("Delete error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Delete failed",
    };
  }
}
