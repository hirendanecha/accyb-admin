'use client';

import React, { useRef, useState } from 'react';
import Image from 'next/image';
import cn from '@/utils/class-names';
import {
  PiFile,
  PiFileCsv,
  PiFileDoc,
  PiFilePdf,
  PiFileXls,
  PiFileZip,
  PiTrashBold,
} from 'react-icons/pi';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { ActionIcon } from '@/components/ui/action-icon';
import Upload from '@/components/ui/upload';
import SimpleBar from '@/components/ui/simplebar';

type AcceptedFiles = 'img' | 'pdf' | 'csv' | 'imgAndPdf' | 'all';
const fileType = {
  'text/csv': <PiFileCsv className="h-5 w-5" />,
  'text/plain': <PiFile className="h-5 w-5" />,
  'application/pdf': <PiFilePdf className="h-5 w-5" />,
  'application/xml': <PiFileXls className="h-5 w-5" />,
  'application/zip': <PiFileZip className="h-5 w-5" />,
  'application/gzip': <PiFileZip className="h-5 w-5" />,
  'application/msword': <PiFileDoc className="h-5 w-5" />,
} as { [key: string]: React.ReactElement };

export default function FileUpload({
  label = 'Upload Files',
  btnLabel = 'Upload',
  fieldLabel,
  error = '',
  multiple = true,
  accept = 'all',
  files,
  setFiles,
  isEdit = false,
}: {
  label?: string;
  fieldLabel?: string;
  btnLabel?: string;
  error?: string;
  multiple?: boolean;
  accept?: AcceptedFiles;
  files: File[];
  setFiles: React.Dispatch<React.SetStateAction<File[]>>;
  isEdit?: boolean;
}) {
  // const [files, setFiles] = useState<Array<File>>([]);
  const imageRef = useRef<HTMLInputElement>(null);

  function handleFileDrop(event: React.ChangeEvent<HTMLInputElement>) {
    const uploadedFiles = (event.target as HTMLInputElement).files;
    const newFiles = Object.entries(uploadedFiles as object)
      .map((file) => {
        if (file[1]) return file[1];
      })
      .filter((file) => file !== undefined);
    setFiles((prevFiles) => [...prevFiles, ...newFiles]);
  }

  function handleImageDelete(index: number) {
    const updatedFiles = files.filter((_, i) => i !== index);
    setFiles(updatedFiles);
    if (imageRef.current) {
      (imageRef.current as HTMLInputElement).value = '';
    }
  }

  return (
    <div className="w-full">
      {files.length === 0 && (
        <Upload
          label={label}
          ref={imageRef}
          accept={accept}
          multiple={multiple}
          onChange={(event) => handleFileDrop(event)}
          className="mb-6 min-h-[240px] justify-center border-dashed bg-gray-50 dark:bg-transparent"
        />
      )}

      {files?.length > 1 ? (
        <Text className="mb-2 text-gray-500">{files.length} files</Text>
      ) : null}

      {files?.length > 0 && (
        <SimpleBar className="max-h-[280px]">
          <div className="grid w-full grid-cols-1 gap-4">
            {files?.map((file: File, index: number) => (
              <div
                className="flex min-h-[58px] w-full items-center rounded-xl border px-3 py-3 dark:border-gray-300"
                key={file.name}
              >
                <div className="flex-shrink- relative flex h-52 w-1/2 items-center justify-center overflow-hidden rounded-lg border border-gray-200 bg-gray-50 object-cover px-2 py-1.5 dark:bg-transparent">
                  {file.type.includes('image') ? (
                    <Image
                      src={URL.createObjectURL(file)}
                      fill
                      priority
                      alt={file.name}
                      sizes="(max-width: 768px) 100vw"
                    />
                  ) : (
                    <>{fileType[file.type]}</>
                  )}
                </div>
                <div className="flex flex-col items-center gap-4 w-1/2 align-middle">
                  <div className="mt-2 truncate px-2.5">{file.name}</div>
                  <ActionIcon
                    onClick={() => handleImageDelete(index)}
                    size="sm"
                    variant="flat"
                    color="danger"
                    className=" flex-shrink-0 p-0 dark:bg-red-dark/20"
                  >
                    <PiTrashBold className="w-6" />
                  </ActionIcon>
                </div>
              </div>
            ))}
          </div>
        </SimpleBar>
      )}
      <div className="mt-4 flex justify-end gap-3">
        <Button
          variant="outline"
          className={cn(!files?.length && 'hidden', 'w-full')}
          onClick={() => setFiles([])}
        >
          Reset
        </Button>
      </div>
      <p className="text-xs text-red">{error}</p>
    </div>
  );
}
