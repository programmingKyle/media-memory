const { app, BrowserWindow, screen, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs-extra');

let mainWindow;
let isMaximized = false;

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('database.db');

db.run(`
  CREATE TABLE IF NOT EXISTS media (
    id INTEGER PRIMARY KEY,
    title TEXT,
    rating INT,
    media TEXT,
    picturePath TEXT,
    dateAdded DATE
  )
`);

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

const createWindow = () => {
  const mainScreen = screen.getPrimaryDisplay();
  const windowWidth = Math.round(mainScreen.size.width * 0.8);
  const windowHeight = Math.round(mainScreen.size.height * 0.8);

  // Create the browser window.
  mainWindow = new BrowserWindow({
    minHeight: 550,
    minWidth: 500,
    width: windowWidth,
    height: windowHeight,
    frame: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  checkBaseDirectories();

  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, 'index.html'));
};


// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
ipcMain.handle('delete-media', (req, data) => {
  if (!data || !data.id || !data.picture) return;

  if (data.picture !== null && data.picture !== 'imageunavailable.png'){
    const filePath = path.join(__dirname, data.picture);
    try {
      fs.unlink(filePath);
    } catch (error) {
      console.error(error);
    }
  }

  const sql = 'DELETE FROM media WHERE id = ?';
  return new Promise((resolve, reject) => {
    db.run(sql, [data.id], (err) => {
      if (err) {
        reject(false);
      } else {
        resolve(true);
      }
    });  
  })
});

ipcMain.handle('check-media-entry', async (req, data) => {
  if (!data || !data.title || !data.media) return;

  const sql = 'SELECT COUNT(*) as count FROM media WHERE title = ? AND media = ?';
  return new Promise((resolve, reject) => {
    db.get(sql, [data.title, data.media], (err, result) => {
      if (err) {
        reject(false);
      } else {
        // This will return true stating that the entry already exists
        resolve(result.count > 0);
      }
      return result.count;
    });  
  })
});

ipcMain.handle('check-edit-title', (req, data) => {
  if (!data || !data.id || !data.title || !data.media) return;

  const sql = 'SELECT COUNT(*) as count FROM media WHERE title = ? AND media = ? AND id <> ?';
  
  return new Promise((resolve, reject) => {
    db.get(sql, [data.title, data.media, data.id], (err, result) => {
      if (err) {
        reject(false);
      } else {
        // Resolve with true if the entry already exists
        resolve(result.count > 0);
      }
    });
  });
});


ipcMain.handle('get-media', async (req, data) => {
  if (!data || !data.mediaType) return;
  let sqlStatement ;
  let results;
  switch (data.mediaType){
    case 'Movie':
      sqlStatement  = "SELECT * FROM media WHERE media = 'Movie';"
      results = getMedia(sqlStatement);
      break;
    case 'TV':
      sqlStatement  = "SELECT * FROM media WHERE media = 'TV';"
      results = getMedia(sqlStatement);
      break;
    case 'Book':
      sqlStatement  = "SELECT * FROM media WHERE media = 'Book';"
      results = getMedia(sqlStatement);
      break;
  }
  return results;
});

async function getMedia(sqlStatement){
  return new Promise((resolve, reject) => {
    db.all(sqlStatement, [], function(error, rows){
      if (error){
        reject(error);
      } else {
        resolve(rows);
      }
    })
  });
}

function checkBaseDirectories() {
  const pictureDirectoryList = ['movie_images', 'tv_images', 'book_images'];

  pictureDirectoryList.forEach(element => {
    const directory = path.join(__dirname, `images/${element}`);
    fs.ensureDir(directory);
  });
}

ipcMain.handle('add-media', async (req, data) => {
  if (!data || !data.media || !data.title || data.rating === undefined) return;

  const titleWithDateTime = `${data.title}-${new Date().toISOString().replace(/:/g, '-')}`;
  switch (data.media) {
    case 'Movie':
      await saveFileToLocation(data.title, data.filePath, 'movie_images');
      break;
    case 'TV':
      await saveFileToLocation(data.title, data.filePath, 'tv_images');
      break;
    case 'Book':
      await saveFileToLocation(data.title, data.filePath, 'book_images');
      break;
  }

  const fileExtension = path.extname(data.filePath);
  const filename = data.filePath !== '' ? `${titleWithDateTime}${fileExtension}` : data.filePath;

  try {
    db.run(
      'INSERT INTO media (title, rating, media, picturePath, dateAdded) VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP)',
      [data.title, data.rating, data.media, filename]
    );
  } catch (error) {
    console.error(error);
  }
});

async function saveFileToLocation(title, filePath, subfolder, oldImage) {
  const baseDirectory = path.join(__dirname, 'images');
  const destinationFolder = path.join(baseDirectory, subfolder);

  const pictureName = filePath.split('\\').pop();

  if (oldImage !== undefined && oldImage !== '' && pictureName !== oldImage){
    const oldImagePath = path.join(destinationFolder, oldImage);
    await fs.unlink(oldImagePath);  
  }

  if (filePath !== ''){
    try {
      fs.ensureDirSync(destinationFolder);
  
      const fileExtension = path.extname(filePath);
      const destinationFilePath = path.join(destinationFolder, title + fileExtension);
  
      fs.copyFileSync(filePath, destinationFilePath);
  
      return true;
    } catch (error) {
      console.error('Error copying file:', error.message);
      return false;
    }  
  }
}

ipcMain.handle('edit-media', async (req, data) => {
  if (!data || !data.media || !data.title || data.rating === undefined) return;

  const filePath = path.isAbsolute(data.image) ? data.image : path.join(__dirname, data.image);

  const titleWithDateTime = `${data.title}-${new Date().toISOString().replace(/:/g, '-')}`;

  switch (data.media) {
    case 'Movie':
      await saveFileToLocation(titleWithDateTime, filePath, 'movie_images', data.currentEditEntry.picturePath);
      break;
    case 'TV':
      await saveFileToLocation(titleWithDateTime, filePath, 'tv_images', data.currentEditEntry.picturePath);
      break;
    case 'Book':
      await saveFileToLocation(titleWithDateTime, filePath, 'book_images', data.currentEditEntry.picturePath);
      break;
  }

  const fileExtension = path.extname(filePath);
  const filename = filePath !== '' ? `${titleWithDateTime}${fileExtension}` : filePath;

  try {
    db.run(
      'UPDATE media SET title = ?, rating = ?, picturePath = ? WHERE id = ?',
      [titleWithDateTime, data.rating, filename, data.currentEditEntry.id]
    );
  } catch (error) {
    console.error(error);
  }
});


ipcMain.handle('frame-handler', (req, data) => {
  if (!data || !data.request) return;
  switch(data.request){
    case 'Minimize':
      mainWindow.minimize();
      break;
    case 'Maximize':
      toggleMaximize();
      break;
    case 'Exit':
      mainWindow.close();
      break;
    }
});

function toggleMaximize(){
  if (isMaximized){
    mainWindow.restore();
  } else {
    mainWindow.maximize();
  }
  isMaximized = !isMaximized;
}
