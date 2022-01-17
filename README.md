# Hosting

The app is hosted on https://inventory-crud-s22.herokuapp.com/ if you would like to test out its functionality.

### Create Item

- fill out the form on the home page
- feel free to upload an image!

### Delete Item

- press the delete button on table view

### Update Item

- Click on the item's name, it will redirect you to a singular view where you can update its fields
- image update is separate from field updating

# Setup

- I use Azure for image hosting, so image hosting will not work on local setups unless you would like to follow the instructions [here](https://docs.microsoft.com/en-us/azure/developer/javascript/tutorial/browser-file-upload-azure-storage-blob) to generate a SAS token and set up your own Azure storage which may cost $$

1. Install backend dependencies

- in the home directory run `npm install`

2. Environment variables

- `cd ../` to go back into the backend directory
- create a `.env` file with the values

```
STORAGESASTOKEN=<your azure sas token>
STORAGERESOURCENAME=<your azure resource name>
BACKENDURL=https://inventory-crud-s22.herokuapp.com/
NODE_ENV="development"
```

3. Run

- run `npm start` in the home directory
