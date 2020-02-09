
import * as utils from 'components/utils';

const uncompressed = '{"hello":"world"}';
const compressed = 'eyJoZWxsbyI6IndvcmxkIn0=';

describe('compress', () => {
  test('compresses the payload', () => {
    expect(utils.compress(uncompressed)).toEqual(compressed);
  });
});

describe('decompress', () => {
  test('decompresses the payload', () => {
    expect(utils.decompress(compressed)).toEqual(uncompressed);
  });
});

describe('getToken', () => {
  test('extracts the csrf token from a meta tag', () => {
    document.head.innerHTML = '<meta name="csrf-token" content="test-token">';
    expect(utils.getToken()).toEqual('test-token');
  });
});
