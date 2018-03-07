const functions = require('firebase-functions');
const admin = require('firebase-admin');
const gcs = require('@google-cloud/storage')();
const spawn = require('child-process-promise').spawn;

admin.initializeApp(functions.config().firebase);


/*

exports.generateThumbnail = functions.storage.object().onChange(event => {
  const data = event.data,
        filePath = data.name,
        fileName = filePath.split('/').pop(),
        bucket = gcs.bucket(data.bucket),
        tempFilePath = `/tmp/${fileName}`;

  if (data.resourceState === 'not_exists') {
    console.log('This is a deletion event.');
    return false;
  }

  if (!data.contentType.startsWith('image/')) {
    console.log('This is not an image.');
    return false;
  }

  if (fileName.startsWith('thumb_')) {
    console.log('Already a thumbnail.');
    return false;
  }

  return bucket.file(filePath).download({
    destination: tempFilePath
  }).then(() => {
    console.log('Image downloaded locally to', tempFilePath);
    return spawn('convert', [tempFilePath, '-thumbnail', '175x', tempFilePath]);
  }).then(() => {
    console.log('Thumbnail created.');
    const thumbFilePath = filePath.replace(/(\/)?([^/]*)$/, '$1thumb_$2');
    return bucket.upload(tempFilePath, { destination: thumbFilePath });
  });

});*/
