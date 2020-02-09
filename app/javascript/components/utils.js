import lz from 'lzutf8';
import dateFnsFormat from 'date-fns/format';
import dateFnsParse from 'date-fns/parse';
import { DateUtils } from 'react-day-picker';

export const compress = json => lz.encodeBase64(lz.compress(json));
export const decompress = base64 => lz.decompress(lz.decodeBase64(base64));
export const getToken = () => document.getElementsByName('csrf-token')[0].content;

export const parseDate = (str, format, locale) => {
  const parsed = dateFnsParse(str, format, new Date(), { locale });

  // require that the year is 4 digits instead of padding with zero
  if (format.substr(format.length - 4) === 'yyyy') {
    if ((str.toString().split('/')[2] || '').length !== 4) {
      return undefined;
    }
  }

  if (DateUtils.isDate(parsed)) return parsed;

  return undefined;
};

export const formatDate = (date, format, locale) => dateFnsFormat(date, format, { locale });
