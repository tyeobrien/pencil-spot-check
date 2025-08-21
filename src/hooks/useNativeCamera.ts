import { Camera } from '@capacitor/camera';
import { CameraResultType, CameraSource } from '@capacitor/camera';

export const useNativeCamera = () => {
  const takePicture = async () => {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.Uri,
        source: CameraSource.Camera,
      });

      return image.webPath;
    } catch (error) {
      console.error('Error taking picture:', error);
      throw error;
    }
  };

  const selectFromGallery = async () => {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.Uri,
        source: CameraSource.Photos,
      });

      return image.webPath;
    } catch (error) {
      console.error('Error selecting from gallery:', error);
      throw error;
    }
  };

  return {
    takePicture,
    selectFromGallery
  };
};