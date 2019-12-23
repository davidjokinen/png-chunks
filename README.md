# png-chunks

Based off of https://github.com/hughsk/png-chunks-extract/ but this also can packup PNG chunks that have been edited and return you PNG data. 

So if you want to grab PNG metadata, update PNG metadata, and get the resulting PNG this is the libary for you. 

## Use

```
const { getChunks, toPNG } = require('png-chunks');
// Get PNG data
const fileData = new Uint8Array(fs.readFileSync('./test.png'));
// Get PNG chunks
const chunks = getChunks(fileData);
// Edit chunks of test.png tEXt chunk
chunks[3].data = yourNewData(); // As a Uint8Array
// Creates a new byte array
const newFileBytes = toPNG(chunks);
// Write the file PNG
fs.writeFileSync('./example-output.png', newFileBytes);
```

