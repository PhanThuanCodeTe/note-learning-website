'use client';

import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import Message from '@/app/components/Message';
import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';
import Button from '@mui/material/Button';

interface UploadedFile {
  id: string;
  name: string;
  type: string;
  url: string;
}

export default function HomePage() {
  const [file, setFile] = useState<UploadedFile | null>(null);
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' | 'info' } | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const newFile = acceptedFiles[0];
      if (newFile.type === 'application/pdf' && !newFile.size) {
        setMessage({ text: 'File PDF không hợp lệ!', type: 'error' });
        return;
      }
      setFile({
        id: Math.random().toString(36).substr(2, 9),
        name: newFile.name,
        type: newFile.type,
        url: URL.createObjectURL(newFile),
      });
      setMessage({ text: 'File uploaded!', type: 'success' });
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif'],
      'video/*': ['.mp4', '.mov'],
      'audio/*': ['.mp3', '.wav'],
      'application/pdf': ['.pdf'],
    },
    multiple: false,
  });

  const renderFilePreview = (file: UploadedFile) => {
    if (file.type.startsWith('image/')) {
      return <img src={file.url} alt={file.name} className="max-w-full h-auto" />;
    } else if (file.type.startsWith('video/')) {
      return (
        <video controls className="max-w-full">
          <source src={file.url} type={file.type} />
          Trình duyệt của bạn không hỗ trợ video.
        </video>
      );
    } else if (file.type.startsWith('audio/')) {
      return (
        <audio controls className="w-full">
          <source src={file.url} type={file.type} />
          Trình duyệt của bạn không hỗ trợ âm thanh.
        </audio>
      );
    } else if (file.type === 'application/pdf') {
      return (
        <embed
          src={file.url}
          type="application/pdf"
          title={file.name}
          className="w-full h-[80vh]"
        />
      );
    }
    return <p>Loại file không được hỗ trợ để xem trước.</p>;
  };

  return (
    <div className="h-screen w-full relative p-4">
      {!file ? (
        <div
          {...getRootProps()}
          className={`h-full w-full flex flex-col items-center justify-center text-center cursor-pointer ${
            isDragActive ? 'bg-blue-50 border-4 border-blue-500' : 'border-2 border-dashed border-gray-300'
          }`}
        >
          <input {...getInputProps()} />
          <p className="text-xl font-semibold">
            {isDragActive ? 'Drag file here...' : 'Drag or click here to see your file preview'}
          </p>
          <p>PDF, Image, Video, Audio</p>
        </div>
      ) : (
        <div className="h-full w-full p-2 flex flex-col">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-xl font-semibold">{file.name}</h3>
            <div className="flex">
            <Button
               variant="contained"
               color="info">
                <SaveIcon className='mr-2' />
               Save
            </Button>
            <Button onClick={() => setFile(null)}
               variant="contained"
               color="error"
               sx={{ ml: 2 }}>
                <CloseIcon className='mr-2' />
               Close
            </Button>
            </div>
          </div>
          <div className="flex-1">{renderFilePreview(file)}</div>
        </div>
      )}

      {message && (
        <div className="absolute top-4 right-4">
          <Message
            message={message.text}
            type={message.type}
            onClose={() => setMessage(null)}
          />
        </div>
      )}
    </div>
  );
}