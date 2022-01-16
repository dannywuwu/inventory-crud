// https://github.com/Azure-Samples/js-e2e-browser-file-upload-storage-blob/blob/main/src/azure-storage-blob.ts
const { BlobServiceClient } = require("@azure/storage-blob");

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
  await createBlobInContainer(containerClient, file);
};

// helper for uploadFileToBlob
const createBlobInContainer = async (containerClient, file) => {
  // create blobClient for container, setting upload name to originalname prop of file
  const blobClient = containerClient.getBlockBlobClient(file.originalname);

  // set mimetype as determined from browser with file upload control
  const options = { blobHTTPHeaders: { blobContentType: file.mimetype } };

  // upload file
  const res = await blobClient.uploadData(file, options);

  console.log(blobClient);
  console.log(blobClient.url);
  console.log("res", res);
};

module.exports = {
  uploadFileToBlob,
};
