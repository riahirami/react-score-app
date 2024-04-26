import { useState, DragEvent } from 'react';

export default function useDragAndDrop(
  onChange: (file: File | null) => void,
  onError: (error: boolean) => void,
  validate?: (file: File) => boolean,
) {
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e: DragEvent<HTMLElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    } else {
      return;
    }
  };

  const handleDrop = (e: DragEvent<HTMLElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (!validate || validate(file)) {
        onChange(file);
        onError(false);
      } else {
        onError(true);
      }
    }
  };

  return { dragActive, handleDrag, handleDrop };
}
