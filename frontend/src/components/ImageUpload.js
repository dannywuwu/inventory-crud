import { React } from "react";

const ImageUpload = ({ itemID }) => {
  return (
    <form
      action={`http://localhost:8080/update-image/${itemID}`}
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
