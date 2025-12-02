import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { UploadCloud, X } from 'lucide-react';
import clsx from 'clsx';

const ImageUpload = ({
  onFileSelect,
  initialPreview = null,
  className = '',
}) => {
  const [preview, setPreview] = useState(initialPreview);
  const [fileName, setFileName] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
      setFileName(file.name);
      onFileSelect(file);
    }
  };

  const handleClearImage = (e) => {
    e.stopPropagation();
    setPreview(null);
    setFileName(null);
    onFileSelect(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleContainerClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div
      className={clsx(
        'relative w-[200px] h-[200px] border-2 border-dashed border-neutral-light rounded-standard bg-neutral-lighter cursor-pointer transition-all duration-150 ease-out hover:border-primary hover:bg-neutral-lighter/80 flex items-center justify-center text-center p-4',
        className
      )}
      onClick={handleContainerClick}
    >
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        accept="image/png, image/jpeg, image/webp"
      />
      
      {preview ? (
        <>
          <img src={preview} alt="Preview" className="w-full h-full object-cover rounded-standard" />
          <button
            onClick={handleClearImage}
            className="absolute top-2 right-2 w-6 h-6 bg-error rounded-full text-white flex items-center justify-center shadow-md hover:bg-error/90"
            aria-label="Remove image"
          >
            <X size={16} />
          </button>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center text-neutral-dark">
          <UploadCloud size={40} className="text-neutral-medium mb-2" />
          <p className="text-body font-semibold">Click to upload</p>
          <p className="text-caption text-neutral-medium mt-1">
            PNG, JPG, WEBP
            <br />
            Max size: 10MB
          </p>
        </div>
      )}
    </div>
  );
};

ImageUpload.propTypes = {
  onFileSelect: PropTypes.func.isRequired,
  initialPreview: PropTypes.string,
  className: PropTypes.string,
};

export default ImageUpload;
