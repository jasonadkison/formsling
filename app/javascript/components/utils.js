import lz from 'lzutf8';

export const compress = json => lz.encodeBase64(lz.compress(json));
export const decompress = base64 => lz.decompress(lz.decodeBase64(base64));
export const getToken = () => document.getElementsByName('csrf-token')[0].content;
