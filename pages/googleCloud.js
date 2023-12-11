import useAuthStore from "@/store/authStore";
import useThemeStore from "@/store/themeStore";
import axiosClient from "@/utils/axiosConfig";
import axiosGoogleClient from "@/utils/axiosGoogle";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { PiGooglePhotosLogoBold } from "react-icons/pi";
import { FaGoogleDrive, FaSpinner } from "react-icons/fa";
import FileFrame from "@/components/FileFrame";
import GoogleRightComp from "@/components/GoogleRightComp";
import useSettingsStore from "@/store/settingsStore";
import { useSignal } from "@preact/signals-react";

const GoogleCloud = () => {
  const isDarkMode = useThemeStore((state) => state.isDarkMode);
  const cmUser = useAuthStore((state) => state.user);
  const autoDeleteDriveItems = useSettingsStore(
    (state) => state.autoDeleteDriveItems
  );
  const [googleCloudMode, setGoogleCloudMode] = useState("drive");
  const [authenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState({});
  const [mediaItems, setMediaItems] = useState([]);
  const [selectedMediaItems, setSelectedMediaItems] = useState([]);
  const [driveFiles, setDriveFiles] = useState([]);
  const [selectedDriveFiles, setSelectedDriveFiles] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [driveFilesLoading, setDriveFilesLoading] = useState(false);
  const [photosLoading, setPhotosLoading] = useState(false);
  const [googleOptimisingStatus, setGoogleOptimisingStatus] = useState({});
  const [nextPageTokenDrive, setNextPageTokenDrive] = useState("");
  const [nextPageTokenPhotos, setNextPageTokenPhotos] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [sizeSelected, setSizeSelected] = useState(0);
  const dropDownRef = useRef(null);
  const [googleOptimisingLoading, setGoogleOptimisingLoading] = useState(false);
  const checkingAuth = useSignal(false);

  const themeClasses = isDarkMode
    ? "bg-dark text-dark "
    : "bg-light text-light ";
  const activeTabClass = isDarkMode
    ? "bg-dark text-dark"
    : "bg-light text-light";

  const getMediaItemsFromPhotosLibrary = async (isRefreshing) => {
    console.log("Getting media items from Photos Library...");
    setPhotosLoading(true);
    try {
      const endpoint = isRefreshing
        ? "/getMediaItems"
        : `/getMediaItems?pageToken=${nextPageTokenPhotos}`;
      const response = await axiosGoogleClient.post(endpoint, {
        phone: cmUser?.phone,
      });
      console.log(response.data);
      setNextPageTokenPhotos(response?.data?.nextPageToken);
      const newMediaItems = response?.data?.mediaItems || [];
      setMediaItems((prevMediaItems) => [...prevMediaItems, ...newMediaItems]);
      setPhotosLoading(false);
    } catch (error) {
      console.error("Error getting media items from Photos Library:", error);
      setPhotosLoading(false);
    }
  };

  const getDriveFiles = async (isRefreshing) => {
    console.log("Getting drive files...");
    setDriveFilesLoading(true);
    try {
      const endpoint = isRefreshing
        ? "/readDrive"
        : `/readDrive?pageToken=${nextPageTokenDrive}`;
      const response = await axiosGoogleClient.post(endpoint, {
        phone: cmUser?.phone,
      });
      console.log(response.data);
      const newFiles = response.data.files || [];
      setDriveFiles((prevFiles) => [...prevFiles, ...newFiles]);
      setDriveFilesLoading(false);
      setNextPageTokenDrive(response.data.nextPageToken);
    } catch (error) {
      console.error("Error getting drive files:", error);
      setDriveFilesLoading(false);
    }
  };

  const getOptimisingStatus = async () => {
    console.log("Getting optimising status...");
    try {
      const response = await axiosClient.post("/getOptimisingStatus", {
        phone: cmUser.phone,
        cloudName: "google",
      });
      console.log(response.data);
      setGoogleOptimisingStatus(response.data.statusFoCloud);
      if (response.data.statusFoCloud === "idle") {
        setGoogleOptimisingLoading(false);
      }
    } catch (error) {
      console.error("Error getting optimising status:", error);
    }
  };

  const checkAuth = async () => {
    console.log("Checking authentication status...");
    checkingAuth.value = true;
    try {
      const response = await axiosGoogleClient.post("/checkAuth", {
        phone: cmUser?.phone,
      });
      console.log(response.data);
      setAuthenticated(response?.data?.authenticated);
      setUser(response?.data?.user);
      checkingAuth.value = false;
    } catch (error) {
      console.error("Error checking authentication status:", error);
      setAuthenticated(false);
      checkingAuth.value = false;
    }
  };

  useEffect(() => {
    checkAuth();
    getOptimisingStatus();
    setMediaItems([]);
    setDriveFiles([]);
    setNextPageTokenDrive("");
    setNextPageTokenPhotos("");
    if (authenticated) {
      if (googleCloudMode === "photos") getMediaItemsFromPhotosLibrary(true);
      else getDriveFiles(true);
    }
  }, [authenticated, googleCloudMode]);

  window.addEventListener("message", (event) => {
    if (event.data === "authSuccess") {
      window.close();
      checkAuth();
    }
  });

  const handleGoogleSignIn = () => {
    window.open(
      `https://api.cyphermanager.com/auth/google?phone=${cmUser.phone}`,
      "_blank",
      "width=500,height=700"
    );
  };

  // const handleGoogleSignIn = () => {
  //   window.open(
  //     `http://localhost:8000/auth/google?phone=${cmUser.phone}`,
  //     "_blank",
  //     "width=500,height=700"
  //   );
  // };

  const handleGoogleSignOut = async () => {
    try {
      const response = await axiosGoogleClient.post("/logout", {
        phone: cmUser?.phone,
      });
      console.log(response.data);
      setAuthenticated(false);
      checkAuth();
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const handleMediaItemSelect = async (itemId) => {
    if (selectedMediaItems.includes(itemId)) {
      setSelectedMediaItems((prev) => prev.filter((id) => id !== itemId));
    } else {
      setSelectedMediaItems((prev) => [...prev, itemId]);
    }
  };

  const handleDriveFileSelect = async (fileId) => {
    if (selectedDriveFiles.includes(fileId)) {
      setSelectedDriveFiles((prev) => prev.filter((id) => id !== fileId));
    } else {
      setSelectedDriveFiles((prev) => [...prev, fileId]);
    }
  };

  const handleOptimiseMediaItemsSelected = async () => {
    console.log("Optimising selected media items...");
    setGoogleOptimisingLoading(true);
    try {
      const response = await axiosGoogleClient.post(
        "/optimiseSelectedMediaItems",
        {
          phone: cmUser.phone,
          cloudName: "google",
          mediaItemIds: selectedMediaItems,
        }
      );
      console.log(response.data);
      setGoogleOptimisingLoading(false);
      setSelectedMediaItems([]);
      setSizeSelected(0);
      getOptimisingStatus();
    } catch (error) {
      console.error("Error optimising media items:", error);
      setGoogleOptimisingLoading(false);
    }
  };

  const handleOptimiseDriveFilesSelected = async () => {
    console.log("Optimising selected drive files...");
    setGoogleOptimisingLoading(true);
    try {
      const response = await axiosGoogleClient.post(
        "/optimiseSelectedDriveFiles",
        {
          phone: cmUser.phone,
          cloudName: "google",
          fileIds: selectedDriveFiles,
          autoDelete: autoDeleteDriveItems,
        }
      );
      console.log(response.data);
      setTimeout(() => {
        getOptimisingStatus();
        setGoogleOptimisingLoading(false);
        setSizeSelected(0);
        setSelectedDriveFiles([]);
      }, 1000);
    } catch (error) {
      console.error("Error optimising drive files:", error);
      setGoogleOptimisingLoading(false);
    }
  };

  const handleSizeSelect = (fileId, size) => {
    if (googleCloudMode === "drive") {
      if (selectedDriveFiles.includes(fileId)) {
        setSelectedDriveFiles((prev) => prev.filter((id) => id !== fileId));
        setSizeSelected((prev) => Number(prev) - Number(size));
      } else {
        setSelectedDriveFiles((prev) => [...prev, fileId]);
        setSizeSelected((prev) => Number(prev) + Number(size));
      }
    } else {
      if (selectedMediaItems.includes(fileId)) {
        setSelectedMediaItems((prev) => prev.filter((id) => id !== fileId));
      } else {
        setSelectedMediaItems((prev) => [...prev, fileId]);
      }
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropDownRef.current && !dropDownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropDownRef]);

  return (
    <section
      className={`${themeClasses} h-screen flex flex-col gap-3 rounded-sm px-5 md:px-8 ${
        authenticated ? "md:w-[81%] md:flex-row justify-between" : "md:w-[81%]"
      }  md:mx-left py-5`}
    >
      <div
        className={`flex ${
          authenticated ? "md:w-[75%]" : "md:w-full"
        } flex-col gap-5`}
      >
        <div className="flex justify-between">
          <div className="flex flex-col">
            <span
              className={`text-2xl md:text-4xl ${
                !isDarkMode ? "text-light_dark" : "text-light_light"
              }`}
            >
              Google Cloud
            </span>
          </div>
        </div>
        {authenticated ? (
          <div>
            <div className="flex flex-col gap-3 md:flex-row md:items-center">
              <div
                className={`flex justify-center py-2 rounded-[4px] md:w-full ${
                  isDarkMode
                    ? "bg-secondary_light text-light"
                    : "bg-secondary_dark text-dark"
                }`}
              >
                <div
                  onClick={() => {
                    setGoogleCloudMode("drive");
                    setSelectedMediaItems([]);
                    setSizeSelected(0);
                  }}
                  className={`flex items-center justify-center gap-3 cursor-pointer py-3 rounded-[4px] px-5 w-[48%] ${
                    googleCloudMode === "drive" ? activeTabClass : ""
                  }`}
                >
                  <div>
                    <FaGoogleDrive />
                  </div>
                  <span> Drive</span>
                </div>
                <div
                  onClick={() => {
                    setGoogleCloudMode("photos");
                    setSelectedDriveFiles([]);
                    setSizeSelected(0);
                  }}
                  className={`flex items-center justify-center gap-3 cursor-pointer py-3 rounded-[4px] px-5 w-[48%] ${
                    googleCloudMode === "photos" ? activeTabClass : ""
                  }`}
                >
                  <div>
                    <PiGooglePhotosLogoBold />
                  </div>
                  <span>Photos</span>
                </div>
              </div>
              {authenticated && (
                <div className="md:hidden flex py-1 gap-3 rounded-[4px]">
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
                          alert(
                            "Please wait for the current optimisation to complete."
                          );
                        }
                      }}
                      className={`flex items-center border-2 justify-center gap-3 cursor-pointer py-3 rounded-[4px] px-5 w-[70%]`}
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
                          alert(
                            "Please wait for the current optimisation to complete."
                          );
                        }
                      }}
                      className={`flex items-center border-2 justify-center gap-3 cursor-pointer py-3 rounded-[4px] px-5 w-[70%]`}
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
                    className="flex items-center border-2 justify-center gap-3 cursor-pointer py-3 rounded-[4px] px-5 w-[30%]"
                  >
                    Refresh
                  </button>
                </div>
              )}
            </div>
            <div>
              {googleCloudMode === "drive" ? (
                <div className="flex flex-col gap-5 my-1 md:mt-4 md:mb-2">
                  <div className="flex flex-col gap-5 h-[60vh] hide-scrollbar md:h-[65vh] overflow-y-auto">
                    {driveFiles?.length > 0 ? (
                      <>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-x-3 gap-y-4 sm:gap-x-4 sm:gap-y-5">
                          {driveFiles?.map((file, i) => (
                            <FileFrame
                              key={i}
                              type="driveFile"
                              file={file}
                              selectedFiles={selectedDriveFiles}
                              handleFileSelect={handleDriveFileSelect}
                              customClass={""}
                              handleSizeSelect={handleSizeSelect}
                            />
                          ))}
                        </div>
                        {!driveFilesLoading ? (
                          <button
                            type="button"
                            className="py-1 rounded-sm border"
                            onClick={() => {
                              getDriveFiles();
                            }}
                            disabled={!nextPageTokenDrive}
                          >
                            {nextPageTokenDrive ? "Load More" : "No more items"}
                          </button>
                        ) : (
                          <span
                            type="button"
                            className="py-1 rounded-sm border text-center"
                            disabled
                          >
                            Loading...
                          </span>
                        )}
                      </>
                    ) : !!driveFilesLoading ? (
                      <span>Loading...</span>
                    ) : (
                      <span>No drive files found.</span>
                    )}
                  </div>
                </div>
              ) : (
                <div className="flex flex-col gap-5 my-1 md:mt-4 md:mb-2">
                  <div className="flex flex-col gap-5 h-[60vh] hide-scrollbar md:h-[65vh] overflow-y-auto">
                    {mediaItems?.length > 0 ? (
                      <>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5">
                          {mediaItems?.map((mediaItem, i) => (
                            <FileFrame
                              key={i}
                              type="mediaItem"
                              file={mediaItem}
                              selectedFiles={selectedMediaItems}
                              handleFileSelect={handleMediaItemSelect}
                              customClass={""}
                              handleSizeSelect={handleSizeSelect}
                            />
                          ))}
                        </div>
                        {!photosLoading ? (
                          <button
                            type="button"
                            className="py-1 rounded-sm border"
                            onClick={() => {
                              getMediaItemsFromPhotosLibrary();
                            }}
                            disabled={!nextPageTokenPhotos}
                          >
                            {nextPageTokenPhotos
                              ? "Load More"
                              : "No more items"}
                          </button>
                        ) : (
                          <span
                            type="button"
                            className="py-1 rounded-sm border text-center"
                            disabled
                          >
                            Loading...
                          </span>
                        )}
                      </>
                    ) : !!photosLoading ? (
                      <span>Loading...</span>
                    ) : (
                      <span>No media items found.</span>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : checkingAuth.value === false ? (
          <div className="flex flex-col items-center justify-center gap-5 h-[60vh] md:h-[63vh] overflow-y-auto">
            <span
              className={`text-2xl md:text-3xl ${
                !isDarkMode ? "text-light_dark" : "text-light_light"
              }`}
            >
              Please connect to continue.
            </span>
            <button
              onClick={handleGoogleSignIn}
              className="px-5 py-1 bg-brand rounded-[4px] text-white shadow-lg"
            >
              Connect
            </button>
          </div>
        ) : !authenticated && checkingAuth.value === true ? (
          <div className="flex flex-col items-center justify-center gap-5 h-[60vh] md:h-[63vh] overflow-y-auto">
            <span
              className={`text-xl md:text-3xl ${
                !isDarkMode ? "text-light_dark" : "text-light_light"
              }`}
            >
              Checking authentication status...
            </span>
          </div>
        ) : null}
      </div>

      {authenticated ? (
        <GoogleRightComp
          customClass={"hidden md:w-[23%] md:flex flex-col gap-5"}
          user={user}
          authenticated={authenticated}
          handleGoogleSignOut={handleGoogleSignOut}
          googleOptimisingStatus={googleOptimisingStatus}
          googleOptimisingLoading={googleOptimisingLoading}
          getOptimisingStatus={getOptimisingStatus}
          googleCloudMode={googleCloudMode}
          selectedMediaItems={selectedMediaItems}
          selectedDriveFiles={selectedDriveFiles}
          handleOptimiseMediaItemsSelected={handleOptimiseMediaItemsSelected}
          handleOptimiseDriveFilesSelected={handleOptimiseDriveFilesSelected}
          setMediaItems={setMediaItems}
          setDriveFiles={setDriveFiles}
          getDriveFiles={getDriveFiles}
          getMediaItemsFromPhotosLibrary={getMediaItemsFromPhotosLibrary}
          sizeSelected={sizeSelected}
          setSizeSelected={setSizeSelected}
          setSelectedDriveFiles={setSelectedDriveFiles}
          setSelectedMediaItems={setSelectedMediaItems}
        />
      ) : null}
    </section>
  );
};

export default GoogleCloud;
