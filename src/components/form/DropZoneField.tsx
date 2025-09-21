/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import React from "react";
import { useDropzone, type Accept } from "react-dropzone";
import type { FieldValues, Path } from "react-hook-form";
import { useFormContext } from ".";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Button } from "../ui/button";
import Image from "next/image";

type FileData = {
  id: string;
  url: string;
};

type DropZoneFieldProps<T extends FieldValues> = {
  name: Path<T>;
  label?: string;
  type?: "button" | "dropzone";
  className?: string;
  disabled?: boolean;
  onUpload: (file: File) => Promise<{ id: string; url: string }>;
  onRemove: (id: string, url: string) => Promise<undefined>;
  title?: string;
  icon?: React.ReactNode;
  maxFiles?: number;
  showPreview?: boolean;
  accept?: Accept;
  onlyIcon?: boolean;
};

const DropZoneField = <T extends FieldValues>({
  name,
  label,
  type = "dropzone",
  className,
  disabled = false,
  onUpload,
  onRemove,
  title = "Upload Files",
  icon,
  maxFiles = 1,
  showPreview = true,
  accept = { "image/*": [] },
  onlyIcon = false,
}: DropZoneFieldProps<T>) => {
  const control = useFormContext<T>();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        const handleDrop = (acceptedFiles: File[]) => {
          acceptedFiles.forEach((file) => {
            onUpload(file)
              .then((res) => {
                field.onChange(res);
              })
              .catch((error) => {
                console.error("Upload failed:", error);
              });
          });
        };

        const handleRemove = async (fileData: FileData) => {
          const currentFiles = (field.value as FileData[]) ?? [];
          const updatedFiles = currentFiles.filter(
            (f: FileData) => f.id !== fileData.id,
          );
          field.onChange(updatedFiles);
          await onRemove(fileData.id, fileData.url);
        };

        const { getRootProps, getInputProps, isDragActive } = useDropzone({
          onDrop: handleDrop,
          disabled,
          maxFiles,
          accept,
        });

        const files = (field.value as FileData[]) ?? [];

        if (type === "button") {
          return (
            <FormItem>
              {label && <FormLabel>{label}</FormLabel>}
              <FormControl>
                <div className={className}>
                  <Button
                    type="button"
                    disabled={disabled}
                    {...getRootProps()}
                    variant={"outline"}
                  >
                    <input {...getInputProps()} multiple={maxFiles > 1} />
                    <div className="flex items-center gap-2">
                      {!onlyIcon && title}
                      {icon}
                    </div>
                  </Button>
                  {showPreview && (
                    <>
                      {files.length > 0 && (
                        <div className="mt-2 space-y-2">
                          {files.map((fileData: FileData) => (
                            <div
                              key={fileData.id}
                              className="flex items-center gap-2 rounded border p-2"
                            >
                              <div className="relative h-12 w-12 overflow-hidden rounded">
                                <Image
                                  src={fileData.url}
                                  alt="Preview"
                                  fill
                                  className="object-cover"
                                />
                              </div>
                              <span className="flex-1">File {fileData.id}</span>
                              <Button
                                type="button"
                                variant="destructive"
                                size="sm"
                                onClick={() => handleRemove(fileData)}
                              >
                                Remove
                              </Button>
                            </div>
                          ))}
                        </div>
                      )}
                    </>
                  )}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          );
        }

        return (
          <FormItem>
            {label && <FormLabel>{label}</FormLabel>}
            <FormControl>
              <div className={className}>
                <div
                  {...getRootProps()}
                  className={`cursor-pointer rounded-lg border-2 border-dashed border-gray-300 p-6 text-center hover:border-gray-400 ${
                    isDragActive ? "border-blue-500 bg-blue-50" : ""
                  } ${disabled ? "cursor-not-allowed opacity-50" : ""}`}
                >
                  <input {...getInputProps()} multiple={maxFiles > 1} />
                  {isDragActive ? (
                    <p>Drop the files here ...</p>
                  ) : (
                    <p>
                      Drag &apos;n&apos; drop some files here, or click to
                      select files
                    </p>
                  )}
                </div>

                {showPreview && (
                  <>
                    {files.length > 0 && (
                      <div className="mt-4 space-y-2">
                        {files.map((fileData: FileData) => (
                          <div
                            key={fileData.id}
                            className="flex items-center gap-2 rounded border p-2"
                          >
                            <div className="relative h-12 w-12 overflow-hidden rounded">
                              <Image
                                src={fileData.url}
                                alt="Preview"
                                fill
                                className="object-cover"
                              />
                            </div>
                            <span className="flex-1">File {fileData.id}</span>
                            <Button
                              type="button"
                              variant="destructive"
                              size="sm"
                              onClick={() => handleRemove(fileData)}
                            >
                              Remove
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                  </>
                )}
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
};

export default DropZoneField;
