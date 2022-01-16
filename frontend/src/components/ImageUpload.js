import { React } from "react";

const ImageUpload = ({ itemID }) => {
  return (
    <form
      action="http://localhost:8080/upload-image"
      encType="multipart/form-data"
      method="post"
    >
      <div className="form-group">
        <label>
          Upload Image:
          <input type="file" name="image" />
        </label>
        <input type="submit" value="Upload Image" />
      </div>
    </form>
  );
};

export default ImageUpload;
