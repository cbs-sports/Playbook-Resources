import React, { useState } from "react";
import "../styles/UI.scss";
// import InfoIcon from '../icons/InfoIcon';
// import PanelIcon from '../icons/PanelIcon';

function Navigation({ activeTab, onTabChange }) {
  const [expanded, setExpanded] = useState(true);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };
  const handleContentReelClick = () => {
    // setLoading(true);
    parent.postMessage(
      { pluginMessage: { type: "contentReel", value: "Content Reel" } },
      "*"
    );
  };
  const handleLinterOptionClick = (option) => {
    console.log("handleLinterOptionClick: ", option);
    // setActiveLinterOption(option);
    // setLoading(true);
    parent.postMessage(
      { pluginMessage: { type: "userSelection", value: option } },
      "*"
    );
  };

  // const handleStickyNoteClick = () => {
  //   parent.postMessage({ pluginMessage: { type: 'stickyNote', value: '' } }, '*');
  // }
  return (
    <nav className="nav_panel">
      <div className="nav_top">
        <div className="title">
          {expanded && <p>Actions</p>}
          <button
            onClick={toggleExpanded}
            className={`icon_panel_close ${
              !expanded ? "icon_panel_close" : ""
            }`}
          >
            {expanded ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
              >
                <mask
                  id="mask0_2922_42092"
                  style={{ maskType: "alpha" }}
                  maskUnits="userSpaceOnUse"
                  x="0"
                  y="0"
                  width="16"
                  height="16"
                >
                  <rect width="16" height="16" fill="#D9D9D9" />
                </mask>
                <g mask="url(#mask0_2922_42092)">
                  <path
                    d="M7.33325 12L3.33325 8L7.33325 4L8.26659 4.93333L5.21659 8L8.26659 11.0667L7.33325 12ZM11.7333 12L7.73325 8L11.7333 4L12.6666 4.93333L9.61659 8L12.6666 11.0667L11.7333 12Z"
                    fill="#181818"
                  />
                </g>
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
              >
                <mask
                  id="mask0_2922_42101"
                  style={{ maskType: "alpha" }}
                  maskUnits="userSpaceOnUse"
                  x="0"
                  y="0"
                  width="16"
                  height="16"
                >
                  <rect width="16" height="16" fill="#D9D9D9" />
                </mask>
                <g mask="url(#mask0_2922_42101)">
                  <path
                    d="M6.38325 8L3.33325 4.93333L4.26659 4L8.26659 8L4.26659 12L3.33325 11.0667L6.38325 8ZM10.7833 8L7.73325 4.93333L8.66659 4L12.6666 8L8.66659 12L7.73325 11.0667L10.7833 8Z"
                    fill="#181818"
                  />
                </g>
              </svg>
            )}
          </button>
        </div>

        <div className="menu_items">
          {expanded && (
            <>
              <a
                className={`menu_item ${
                  activeTab === "linter" ? "activeNav" : ""
                }`}
                onClick={() => {
                  onTabChange("linter");
                  handleLinterOptionClick("All");
                }}
              >
                Linter
              </a>
              <a
                className={`menu_item ${
                  activeTab === "contentReel" ? "activeNav" : ""
                }`}
                onClick={() => {
                  onTabChange("contentReel");
                  handleContentReelClick();
                }}
              >
                Content Reel
              </a>
              <a
                className={`menu_item ${
                  activeTab === "stickyNote" ? "activeNav" : ""
                }`}
                onClick={() => {
                  onTabChange("stickyNote");
                  // handleStickyNoteClick();
                }}
              >
                Sticky Note
              </a>
            </>
          )}
        </div>
        <div className="bottomNav">
          <div
            className={`about_container ${!expanded ? "centerIcons" : ""}`}
            onClick={() => {
              onTabChange("styles");
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
            >
              <path
                d="M8 16C6.90278 16 5.86806 15.7917 4.89583 15.375C3.92361 14.9583 3.07292 14.3854 2.34375 13.6562C1.61458 12.9271 1.04167 12.0764 0.625 11.1042C0.208333 10.1319 0 9.09722 0 8C0 6.88889 0.211806 5.85069 0.635417 4.88542C1.05903 3.92014 1.64236 3.07292 2.38542 2.34375C3.12847 1.61458 3.99653 1.04167 4.98958 0.625C5.98264 0.208333 7.04167 0 8.16667 0C9.25 0 10.2674 0.1875 11.2188 0.5625C12.1701 0.9375 13 1.45139 13.7083 2.10417C14.4167 2.75694 14.9757 3.52083 15.3854 4.39583C15.7951 5.27083 16 6.20833 16 7.20833C16 8.54167 15.5347 9.67361 14.6042 10.6042C13.6736 11.5347 12.5417 12 11.2083 12H9.79167C9.68056 12 9.58333 12.0347 9.5 12.1042C9.41667 12.1736 9.375 12.2639 9.375 12.375C9.375 12.5833 9.47917 12.7569 9.6875 12.8958C9.89583 13.0347 10 13.4028 10 14C10 14.5139 9.8125 14.9757 9.4375 15.3854C9.0625 15.7951 8.58333 16 8 16ZM3.5 8.75C3.84722 8.75 4.14236 8.62847 4.38542 8.38542C4.62847 8.14236 4.75 7.84722 4.75 7.5C4.75 7.15278 4.62847 6.85764 4.38542 6.61458C4.14236 6.37153 3.84722 6.25 3.5 6.25C3.15278 6.25 2.85764 6.37153 2.61458 6.61458C2.37153 6.85764 2.25 7.15278 2.25 7.5C2.25 7.84722 2.37153 8.14236 2.61458 8.38542C2.85764 8.62847 3.15278 8.75 3.5 8.75ZM6 5.75C6.34722 5.75 6.64236 5.62847 6.88542 5.38542C7.12847 5.14236 7.25 4.84722 7.25 4.5C7.25 4.15278 7.12847 3.85764 6.88542 3.61458C6.64236 3.37153 6.34722 3.25 6 3.25C5.65278 3.25 5.35764 3.37153 5.11458 3.61458C4.87153 3.85764 4.75 4.15278 4.75 4.5C4.75 4.84722 4.87153 5.14236 5.11458 5.38542C5.35764 5.62847 5.65278 5.75 6 5.75ZM10 5.75C10.3472 5.75 10.6424 5.62847 10.8854 5.38542C11.1285 5.14236 11.25 4.84722 11.25 4.5C11.25 4.15278 11.1285 3.85764 10.8854 3.61458C10.6424 3.37153 10.3472 3.25 10 3.25C9.65278 3.25 9.35764 3.37153 9.11458 3.61458C8.87153 3.85764 8.75 4.15278 8.75 4.5C8.75 4.84722 8.87153 5.14236 9.11458 5.38542C9.35764 5.62847 9.65278 5.75 10 5.75ZM12.5 8.75C12.8472 8.75 13.1424 8.62847 13.3854 8.38542C13.6285 8.14236 13.75 7.84722 13.75 7.5C13.75 7.15278 13.6285 6.85764 13.3854 6.61458C13.1424 6.37153 12.8472 6.25 12.5 6.25C12.1528 6.25 11.8576 6.37153 11.6146 6.61458C11.3715 6.85764 11.25 7.15278 11.25 7.5C11.25 7.84722 11.3715 8.14236 11.6146 8.38542C11.8576 8.62847 12.1528 8.75 12.5 8.75ZM8 14.5C8.15278 14.5 8.27431 14.441 8.36458 14.3229C8.45486 14.2049 8.5 14.0972 8.5 14C8.5 13.7778 8.39583 13.5833 8.1875 13.4167C7.97917 13.25 7.875 12.9028 7.875 12.375C7.875 11.8472 8.05903 11.4028 8.42708 11.0417C8.79514 10.6806 9.24306 10.5 9.77083 10.5H11.2083C12.125 10.5 12.9028 10.1806 13.5417 9.54167C14.1806 8.90278 14.5 8.125 14.5 7.20833C14.5 5.61111 13.8854 4.26042 12.6562 3.15625C11.4271 2.05208 9.93056 1.5 8.16667 1.5C6.30556 1.5 4.72917 2.13194 3.4375 3.39583C2.14583 4.65972 1.5 6.19444 1.5 8C1.5 9.80556 2.13194 11.3403 3.39583 12.6042C4.65972 13.8681 6.19444 14.5 8 14.5Z"
                fill="#1C1B1F"
              />
            </svg>
            {expanded && <p>Styles</p>}
          </div>
          <div
            className={`about_container ${!expanded ? "centerIcons" : ""}`}
            onClick={() => {
              onTabChange("about");
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
            >
              <g clipPath="url(#clip0_2595_3891)">
                <path
                  d="M8 12C8.22667 12 8.41667 11.9233 8.57 11.77C8.72333 11.6167 8.8 11.4267 8.8 11.2V8C8.8 7.77333 8.72333 7.58333 8.57 7.43C8.41667 7.27667 8.22667 7.2 8 7.2C7.77333 7.2 7.58333 7.27667 7.43 7.43C7.27667 7.58333 7.2 7.77333 7.2 8V11.2C7.2 11.4267 7.27667 11.6167 7.43 11.77C7.58333 11.9233 7.77333 12 8 12ZM8 5.6C8.22667 5.6 8.41667 5.52333 8.57 5.37C8.72333 5.21667 8.8 5.02667 8.8 4.8C8.8 4.57333 8.72333 4.38333 8.57 4.23C8.41667 4.07667 8.22667 4 8 4C7.77333 4 7.58333 4.07667 7.43 4.23C7.27667 4.38333 7.2 4.57333 7.2 4.8C7.2 5.02667 7.27667 5.21667 7.43 5.37C7.58333 5.52333 7.77333 5.6 8 5.6ZM8 16C6.89333 16 5.85333 15.79 4.88 15.37C3.90667 14.95 3.06 14.38 2.34 13.66C1.62 12.94 1.05 12.0933 0.63 11.12C0.21 10.1467 0 9.10667 0 8C0 6.89333 0.21 5.85333 0.63 4.88C1.05 3.90667 1.62 3.06 2.34 2.34C3.06 1.62 3.90667 1.05 4.88 0.63C5.85333 0.21 6.89333 0 8 0C9.10667 0 10.1467 0.21 11.12 0.63C12.0933 1.05 12.94 1.62 13.66 2.34C14.38 3.06 14.95 3.90667 15.37 4.88C15.79 5.85333 16 6.89333 16 8C16 9.10667 15.79 10.1467 15.37 11.12C14.95 12.0933 14.38 12.94 13.66 13.66C12.94 14.38 12.0933 14.95 11.12 15.37C10.1467 15.79 9.10667 16 8 16ZM8 14.4C9.78667 14.4 11.3 13.78 12.54 12.54C13.78 11.3 14.4 9.78667 14.4 8C14.4 6.21333 13.78 4.7 12.54 3.46C11.3 2.22 9.78667 1.6 8 1.6C6.21333 1.6 4.7 2.22 3.46 3.46C2.22 4.7 1.6 6.21333 1.6 8C1.6 9.78667 2.22 11.3 3.46 12.54C4.7 13.78 6.21333 14.4 8 14.4Z"
                  fill="#181B29"
                />
              </g>
              <defs>
                <clipPath id="clip0_2595_3891">
                  <rect width="16" height="16" fill="white" />
                </clipPath>
              </defs>
            </svg>
            {expanded && <p>About</p>}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
