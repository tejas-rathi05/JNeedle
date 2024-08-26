import { useUploadFile } from "../hooks/useUploadFile";

export const getUploadedFiles = async () => {
  const { uploadedFiles } = useUploadFile(); // Ensure this hook is used correctly
  return uploadedFiles;
}