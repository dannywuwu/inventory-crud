import { React } from "react";
import ENV from "../config";
const API_HOST = ENV.api_host;

const ImageUpload = ({ itemID }) => {
  return (
    <form
      action={`${API_HOST}/update-image/${itemID}`}
      encType="multipart/form-data"
      method="post"
    >
      <div className="form-group">
        <label>
          Update Image:
          <input type="file" name="image" />
        </label>
        <input type="submit" value="Update Image" />
      </div>
    </form>
  );
};

export default ImageUpload;
