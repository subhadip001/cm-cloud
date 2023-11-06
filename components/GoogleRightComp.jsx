import useAuthStore from "@/store/authStore";
import useThemeStore from "@/store/themeStore";
import axiosGoogleClient from "@/utils/axiosGoogle";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FaSpinner } from "react-icons/fa";

const GoogleRightComp = ({
  customClass,
  user,
  authenticated,
  handleGoogleSignOut,
  googleOptimisingStatus,
  googleOptimisingLoading,
  handleOptimiseMediaItemsSelected,
  handleOptimiseDriveFilesSelected,
  selectedMediaItems,
  selectedDriveFiles,
  setMediaItems,
  setDriveFiles,
  getOptimisingStatus,
  getDriveFiles,
  getMediaItemsFromPhotosLibrary,
  googleCloudMode,
  sizeSelected,
  setSizeSelected,
  setSelectedDriveFiles,
  setSelectedMediaItems,
}) => {
  const isDarkMode = useThemeStore((state) => state.isDarkMode);
  const cmUser = useAuthStore((state) => state.user);
  const [driveInfo, setDriveInfo] = useState(null);

  const handleDriveInfo = async () => {
    try {
      const res = await axiosGoogleClient.post("/getDriveInfo", {
        phone: cmUser?.phone,
      });
      console.log(res?.data);
      setDriveInfo(res?.data.driveInfo);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleDriveInfo();
  }, []);

  return (
    <div className={`${customClass}`}>
      <div className="flex items-center justify-between">
        {authenticated && (
          <div className="flex gap-1 items-center cursor-pointer">
            <Image
              src={user?.picture}
              width={30}
              referrerPolicy="no-referrer"
              height={30}
              alt="User profile picture"
              style={{ borderRadius: "50%" }}
            />
            <span>{user?.name}</span>
          </div>
        )}
        <button
          onClick={handleGoogleSignOut}
          className="flex items-center"
          type="button"
        >
          Sign Out
        </button>
      </div>

      <div className="flex flex-col md:w-full py-1 gap-3 rounded-[4px]">
        <div>
          <span className="">Storage</span>
          <div className="flex items-center justify-between">
            <span className="text-xs">Used</span>
            <span className="text-xs">
              {driveInfo?.storageQuota?.usageInDrive
                ? (
                    driveInfo?.storageQuota?.usageInDrive /
                    (1024 * 1024 * 1024)
                  ).toFixed(2)
                : 0}{" "}
              GB
            </span>

            <span className="text-xs">Total</span>
            <span className="text-xs">
              {driveInfo?.storageQuota?.limit
                ? (
                    driveInfo?.storageQuota?.limit /
                    (1024 * 1024 * 1024)
                  ).toFixed(2)
                : 0}{" "}
              GB
            </span>
          </div>
        </div>
        {googleCloudMode === "photos" ? (
          <button
            disabled={
              selectedMediaItems.length === 0 ||
              googleOptimisingLoading ||
              googleOptimisingStatus === "optimising"
            }
            onClick={() => {
              console.log(googleOptimisingStatus);
              if (googleOptimisingStatus === "idle") {
                handleOptimiseMediaItemsSelected();
              } else {
                alert("Please wait for the current optimisation to complete.");
              }
            }}
            className={`flex items-center border-2 justify-center gap-3 cursor-pointer py-1 rounded-[4px] px-2`}
          >
            {googleOptimisingLoading ||
            googleOptimisingStatus === "optimising" ? (
              <>
                <FaSpinner className="animate-spin" />
                <span className="ml-1">Optimising</span>
              </>
            ) : (
              `Optimise Selected(${selectedMediaItems.length})`
            )}
          </button>
        ) : (
          <button
            disabled={
              selectedDriveFiles.length === 0 ||
              googleOptimisingLoading ||
              googleOptimisingStatus === "optimising"
            }
            onClick={() => {
              console.log(googleOptimisingStatus);
              console.log(sizeSelected / (1024 * 1024 * 1024));
              if (googleOptimisingStatus === "idle") {
                if (sizeSelected / (1024 * 1024 * 1024) > 1) {
                  alert(
                    "Please select total file(s) size less than 1GB. This feature is currently under development."
                  );
                  setSelectedDriveFiles([]);
                  setSizeSelected(0);
                  return;
                } else {
                  handleOptimiseDriveFilesSelected();
                }
              } else {
                alert("Please wait for the current optimisation to complete.");
              }
            }}
            className={`flex items-center border-2 justify-center gap-3 cursor-pointer py-1 rounded-[4px] px-5 w-full`}
          >
            {googleOptimisingLoading ||
            googleOptimisingStatus === "optimising" ? (
              <>
                <FaSpinner className="animate-spin" />
                <span className="ml-1">Optimising</span>
              </>
            ) : (
              `Optimise Selected(${selectedDriveFiles.length})`
            )}
          </button>
        )}

        <button
          onClick={() => {
            setMediaItems([]);
            setDriveFiles([]);
            if (googleCloudMode === "drive") {
              getOptimisingStatus();
              getDriveFiles(true);
            } else if (googleCloudMode === "photos") {
              getOptimisingStatus();
              getMediaItemsFromPhotosLibrary(true);
            }
          }}
          className="flex items-center border-2 justify-center gap-3 cursor-pointer py-1 rounded-[4px] px-5 w-full"
        >
          Refresh
        </button>
      </div>
    </div>
  );
};

export default GoogleRightComp;
