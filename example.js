const fs = require('fs');
const { getChunks, toPNG } = require('./index.js');

function stringToUint8Array(str) {
  return Uint8Array.from(str.split('').map(char => char.charCodeAt(0)))
}

// Test file is PNG with DMI data in the tEXt data
const fileData = new Uint8Array(fs.readFileSync('./test.png'));
const chunks = getChunks(fileData);

// View the chunks
console.log('Chunks: ',chunks);

// Update tEXt chunk with new data
const oldChunkString = new TextDecoder("utf-8").decode(chunks[3].data);
console.log("Old tEXt data: ",oldChunkString)
chunks[3].data = stringToUint8Array('This is new Text!');

// Creates a new byte arr
const newFileBytes = toPNG(chunks);

// Write the file out. 
fs.writeFileSync('./example-output.png', newFileBytes);

const createdFileData = new Uint8Array(fs.readFileSync('./example-output.png'));
const newChunks = getChunks(createdFileData);

// Converting to Uint8Array to string
const chunkString = new TextDecoder("utf-8").decode(newChunks[3].data);

// View the new tEXt chunk
console.log("Old tEXt data: ",chunkString)
