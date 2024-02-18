import React from 'react';

interface ImageUploadProps {
  onImageChange: (imageUrl: string) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onImageChange }) => {
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageUrl = reader.result as string;
        onImageChange(imageUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <input type="file" accept="image/*" onChange={handleImageChange} />
  );
};

export default ImageUpload;
