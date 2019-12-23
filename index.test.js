const fs = require('fs');
const { getChunks, toPNG } = require('./index.js');

function stringToUint8Array(str) {
  return Uint8Array.from(str.split('').map(char => char.charCodeAt(0)))
}

test('Test that it can get chunks.', () => {
  const fileData = new Uint8Array(fs.readFileSync('./test.png'));
  const chunks = getChunks(fileData);
  expect(chunks.length).toBe(6);
  expect(chunks[0].chunkType).toBe('IHDR');
  expect(chunks[1].chunkType).toBe('PLTE');
  expect(chunks[2].chunkType).toBe('tRNS');
  expect(chunks[3].chunkType).toBe('tEXt');
  expect(chunks[4].chunkType).toBe('IDAT');
  expect(chunks[5].chunkType).toBe('IEND');
});

test('Test that it can get chunks then get same PNG', () => {
  const fileData = new Uint8Array(fs.readFileSync('./test.png'));
  const chunks = getChunks(fileData);
  const newFileData = toPNG(chunks);
  expect(fileData).toStrictEqual(newFileData);
});

test('Test that it can get chunks be edited then get PNG', () => {
  const testString = 'New test metadata';
  const fileData = new Uint8Array(fs.readFileSync('./test.png'));
  const chunks = getChunks(fileData);
  chunks[3].data = stringToUint8Array(testString);
  const newFileData = toPNG(chunks);
  expect(newFileData.length).toBe(22206);
  const newChunks = getChunks(newFileData);
  expect(newChunks[3].data).toStrictEqual(stringToUint8Array(testString));
});
