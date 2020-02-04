
import * as utils from '../utils';

describe('compress', () => {
  test('compresses the payload', () => {
    expect(utils.compress('{"hello":"world"}')).toEqual('eyJoZWxsbyI6IndvcmxkIn0=');
  });
});

describe('decompress', () => {
  test('decompresses the payload', () => {
    expect(utils.decompress('eyJoZWxsbyI6IndvcmxkIn0=')).toEqual('{"hello":"world"}');
  });
});

describe('getToken', () => {
  test('extracts the csrf token from a meta tag', () => {
    document.head.innerHTML = '<meta name="csrf-token" content="test-token">';
    expect(utils.getToken()).toEqual('test-token');
  });
});
