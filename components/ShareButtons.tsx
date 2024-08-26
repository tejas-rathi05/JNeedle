// components/ShareButtons.js
import React from "react";

const ShareButtons = ({
  imageURL,
  pageURL,
}: {
  imageURL: string;
  pageURL: string;
}) => {
  const handleSharePinterest = () => {
    const pinterestURL = `https://pinterest.com/pin/create/button/?media=${encodeURIComponent(imageURL)}`;
    window.open(pinterestURL, "_blank");
  };

  const handleShareFacebook = () => {
    const facebookURL = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      pageURL
    )}`;
    window.open(facebookURL, "_blank");
  };

  const handleShareInstagram = () => {
    alert(
      "Instagram sharing is typically done through their mobile app. Please share manually."
    );
  };

  return (
    <div>
      <button onClick={handleSharePinterest}>Share to Pinterest</button>
      <button onClick={handleShareFacebook}>Share to Facebook</button>
      <button onClick={handleShareInstagram}>Share to Instagram</button>
    </div>
  );
};

export default ShareButtons;
