// useFileUpload hook - Handle file validation và mock upload
import { useState } from 'react';

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

const useFileUpload = () => {
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState(null);

    const validateFile = (file) => {
        setError(null);

        if (!file) {
            setError('No file selected');
            return false;
        }

        if (file.size > MAX_FILE_SIZE) {
            setError(`File size exceeds 10MB limit (${(file.size / 1024 / 1024).toFixed(2)}MB)`);
            return false;
        }

        return true;
    };

    const uploadFile = async (file) => {
        if (!validateFile(file)) {
            return null;
        }

        setUploading(true);
        setError(null);

        try {
            // Mock upload - replace with actual API call
            // const formData = new FormData();
            // formData.append('file', file);
            // const response = await fetch('/api/upload', {
            //   method: 'POST',
            //   body: formData
            // });
            // const data = await response.json();

            // Mock delay
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Mock response
            const mockUrl = URL.createObjectURL(file);
            const result = {
                url: mockUrl,
                filename: file.name,
                size: file.size,
                type: file.type
            };

            console.log('Mock file upload:', result);
            setUploading(false);
            return result;
        } catch (err) {
            setError(err.message || 'Upload failed');
            setUploading(false);
            return null;
        }
    };

    const uploadMultiple = async (files) => {
        const results = await Promise.all(
            Array.from(files).map(file => uploadFile(file))
        );
        return results.filter(Boolean);
    };

    return {
        uploadFile,
        uploadMultiple,
        uploading,
        error,
        validateFile
    };
};

export default useFileUpload;
