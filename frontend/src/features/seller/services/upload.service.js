import { uploadImageAPI, uploadImagesAPI } from "../../../api/upload.api";

class UploadService {
  uploadImage(file) {
    return uploadImageAPI(file);
  }

  // files: FileList or File[]  →  returns { urls: string[] }
  uploadImages(files) {
    return uploadImagesAPI(files);
  }
}

export default new UploadService();