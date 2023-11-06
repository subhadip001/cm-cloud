import React from "react";
import Image from "next/image";
import { RiVideoLine, RiImageLine } from "react-icons/ri";

const FileFrame = ({
  keyId,
  type,
  file,
  selectedFiles,
  handleFileSelect,
  customClass,
  handleSizeSelect,
}) => {
  let fileSize;
  if (file?.size < 1024) {
    fileSize = file?.size + " B";
  } else if (file?.size < 1024 * 1024) {
    fileSize = (file?.size / 1024).toFixed(2) + " KB";
  } else if (file?.size < 1024 * 1024 * 1024) {
    fileSize = (file?.size / (1024 * 1024)).toFixed(2) + " MB";
  } else if (file?.size < 1024 * 1024 * 1024 * 1024) {
    fileSize = (file?.size / (1024 * 1024 * 1024)).toFixed(2) + " GB";
  } else if (file?.size < 1024 * 1024 * 1024 * 1024 * 1024) {
    fileSize = (file?.size / (1024 * 1024 * 1024 * 1024)).toFixed(2) + " TB";
  }

  let fileName;
  if (type === "mediaItem") {
    if (file?.filename?.length > 10) {
      fileName = file?.filename?.slice(0, 10) + "...";
    } else {
      fileName = file?.filename;
    }
  } else if (type === "driveFile") {
    if (file?.name?.length > 10) {
      fileName = file?.name?.slice(0, 10) + "...";
    } else {
      fileName = file?.name;
    }
  }

  let imageSrc;
  if (type === "mediaItem") {
    imageSrc = file?.baseUrl;
  } else {
    imageSrc = file?.thumbnailLink;
  }

  return (
    <div
      className={`${customClass}`}
      onClick={() => {
        //handleFileSelect(file?.id);
        handleSizeSelect(file?.id, file?.size);
      }}
    >
      <div
        className={`w-full lg:h-[14rem] text-xs flex flex-col rounded-md bg-[#b7c5dc73] px-2 ${
          selectedFiles.includes(file?.id) ? "bg-selected_frame" : ""
        }`}
      >
        <div className="p-2 w-full flex justify-between bg-transparent items-center ">
          <div className="flex items-center gap-2">
            {type === "driveFile" ? (
              <Image
                src={file?.iconLink}
                className="w-[15px] h-[15px]"
                width={15}
                height={15}
                referrerPolicy="no-referrer"
                alt="icon"
              />
            ) : type === "mediaItem" && file?.mimeType?.includes("video") ? (
              <RiVideoLine />
            ) : (
              <RiImageLine />
            )}

            <span>{fileName}</span>
          </div>
          <span className="">{fileSize}</span>
        </div>

        <img
          className="h-[75%] rounded-md block bg-transparent w-full object-cover"
          src={imageSrc}
          alt={fileName}
          referrerPolicy="no-referrer"
        />
        <div className="p-2 w-full bg-transparent">
          <span className="text-xs text-gray-400">{file?.modifiedTime}</span>
        </div>
      </div>
    </div>
  );
};

export default FileFrame;
