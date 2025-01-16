import {
  UploadApiOptions,
  UploadApiResponse,
} from 'cloudinary-react-native/lib/typescript/src/api/upload/model/params/upload-params';
import { Cloudinary } from "@cloudinary/url-gen";
import { upload } from 'cloudinary-react-native';

export const cld = new Cloudinary({
  cloud: {
    cloudName: process.env.EXPO_PUBLIC_CLOUD_NAME,
    apiKey: process.env.EXPO_PUBLIC_API_KEY,
    apiSecret: process.env.EXPO_PUBLIC_API_SECRET
  }
});

export const uploadImage = async (file: string) => {
  const options: UploadApiOptions = {
    upload_preset: 'default',
    unsigned: true,
    resource_type: 'auto',
  };

  return new Promise<UploadApiResponse>(async (resolve, reject) => {
    // upload the image to cloudinary
    await upload(cld, {
      file,
      options: options,
      callback: (error, response) => {
        if (error || !response) {
          reject(error);
        } else {
          resolve(response);
        }
      },
    });
  });
};