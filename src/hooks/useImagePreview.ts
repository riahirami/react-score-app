import { GlobalVariables } from 'config/constant';
import { useEffect, useState } from 'react';

function useImagePreview(image?: File) {
  const [preview, setPreview] = useState(GlobalVariables.EmptyString);

  useEffect(() => {
    // create the preview
    if (image) {
      const objectUrl = URL.createObjectURL(image);
      setPreview(objectUrl);
      // free memory when ever this component is unmounted
      return () => URL.revokeObjectURL(objectUrl);
    }
    return () => {};
  }, [image]);

  return { preview };
}

export default useImagePreview;
