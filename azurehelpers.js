// https://github.com/Azure-Samples/js-e2e-browser-file-upload-storage-blob/blob/main/src/azure-storage-blob.ts
const { BlobServiceClient } = require("@azure/storage-blob");
const { v4: uuidv4 } = require("uuid");

const containerName = `crud-storage`;
const sasToken = process.env.STORAGESASTOKEN;
const storageAccountName = process.env.STORAGERESOURCENAME;

// upload file to azure blob storage
const uploadFileToBlob = async (file) => {
  // get BlobService
  const blobService = new BlobServiceClient(
    `https://${storageAccountName}.blob.core.windows.net/?${sasToken}`
  );

  // get Azure container
  const containerClient = blobService.getContainerClient(containerName);
  await containerClient.createIfNotExists({
    access: "container",
  });

  // upload file
  const url = await createBlobInContainer(containerClient, file);
  return url;
};

// helper for uploadFileToBlob
const createBlobInContainer = async (containerClient, file) => {
  // create blobClient for container, setting upload name to originalname prop of file
  const blobClient = containerClient.getBlockBlobClient(
    `${file.originalname}-${uuidv4()}`
  );

  // set mimetype as determined from browser with file upload control
  const options = { blobHTTPHeaders: { blobContentType: file.mimetype } };

  // upload file
  await blobClient.uploadData(file, options);

  // return uploaded blob url
  return blobClient.url.split("?")[0];
};

module.exports = {
  uploadFileToBlob,
};
