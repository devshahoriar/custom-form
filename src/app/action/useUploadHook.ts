import { useMutation } from "@tanstack/react-query";
import { deleteFileAction, uploadFileAction } from "./upload";

export const useUpload = (onSuccess?: (url: string, fileId: string) => void) =>
  useMutation({
    mutationFn: ({ file, folder }: { file: File; folder?: string }) => {
      const formData = new FormData();
      formData.append("file", file);
      return uploadFileAction(formData, folder);
    },
    onSuccess: (data) => {
      if (data.success && data.data && onSuccess) {
        onSuccess(data.data.url, data.data.fileId);
      }
    },
  });

export const useDeleteUpload = () => {
  return useMutation({
    mutationFn: (fileId: string) => deleteFileAction(fileId),
  });
};
