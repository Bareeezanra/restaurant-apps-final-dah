const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const target = path.resolve(__dirname, 'src/public/images/heros');
const destination = path.resolve(__dirname, 'src/public/images/heros');

if (!fs.existsSync(target)) {
  console.error(`Source directory doesn't exist: ${target}`);
  process.exit(1);
}

// Create destination directory if it doesn't exist
if (!fs.existsSync(destination)) {
  fs.mkdirSync(destination, { recursive: true });
}

// Get list of files and log them
const files = fs.readdirSync(target);
console.log('Files found:', files);

files.forEach((image) => {
  const inputPath = path.join(target, image);

  // Log file details
  try {
    const stats = fs.statSync(inputPath);
    console.log(`Processing ${image} (${stats.size} bytes)`);
  } catch (err) {
    console.error(`Error checking file ${image}:`, err);
    return;
  }

  // Process large version
  sharp(inputPath)
    .resize(800)
    .toFile(
      path.resolve(
        __dirname,
        `${destination}/${image.split('.').slice(0, -1).join('.')}-large.jpg`
      )
    )
    .then((info) => {
      console.log(`Successfully created large version of ${image}:`, info);
    })
    .catch((err) => {
      console.error(`Error processing large version of ${image}:`, err);
    });

  // Process small version
  sharp(inputPath)
    .resize(480)
    .toFile(
      path.resolve(
        __dirname,
        `${destination}/${image.split('.').slice(0, -1).join('.')}-small.jpg`
      )
    )
    .then((info) => {
      console.log(`Successfully created small version of ${image}:`, info);
    })
    .catch((err) => {
      console.error(`Error processing small version of ${image}:`, err);
    });
});
