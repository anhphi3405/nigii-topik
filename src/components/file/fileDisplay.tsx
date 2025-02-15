import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FileDisplay = ({ fileId}) => {
    const [fileUrl, setFileUrl] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [fileType, setFileType] = useState<string | null>(null);

    useEffect(() => {
        const fetchFile = async () => {
            try {
                const response = await axios({
                    url: `http://localhost:5000/download/files/${fileId}`,
                    method: 'GET',
                    responseType: 'blob', // Quan trọng để nhận dữ liệu dưới dạng blob
                });

                // Tạo URL cho tệp
                const url = URL.createObjectURL(response.data);
                setFileUrl(url);

                const contentType = response.headers['content-type'];
                console.log('File type:', contentType);
                setFileType(contentType);
                
            } catch (error) {
                console.error('Error downloading file:', error);
                setError('Unable to download file');
            }
        };

        if (fileId) {
            fetchFile();
        }
    }, [fileId]);

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!fileUrl) {
        return <div>Loading file...</div>;
    }

    // Xác định loại tệp và hiển thị tương ứng
    if (fileType && fileType.startsWith('image/')) {
        return <img src={fileUrl} alt="File" />;
    } else if (fileType && fileType.startsWith('audio/')) {
        return <audio controls src={fileUrl}></audio>;
    } else if (fileType && fileType.startsWith('video/')) {
        return <video controls src={fileUrl}></video>;
    } else {
        return <a href={fileUrl} download >Download File</a>;
    }
};

export default FileDisplay;