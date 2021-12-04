import { get as _get } from 'lodash';

export const fetcher = (url: string) => fetch(url).then((r) => r.json());

export const removeProtocolFromUrl = (url: string) => url.replace(/(^\w+:|^)\/\//, '');

export const formatPrice = (price: number, locale = 'en', currency = 'USD'): string =>
  new Intl.NumberFormat(locale, { style: 'currency', currency, maximumFractionDigits: 4 }).format(price);

export const formatNumber = (number: number, locale = 'en'): string => new Intl.NumberFormat(locale).format(number);

export const arrSortAscByKey = (arr: any[], key: string) => arr.sort((a, b) => _get(b, key) - _get(a, key));

export const arrSortDescByKey = (arr: any[], key: string) => arr.sort((a, b) => _get(a, key) - _get(b, key));

export const arrSortStringAscByKey = (arr: any[], key: string) =>
  arr.sort((a, b) => _get(a, key).localeCompare(_get(b, key)));

export const arrSortStringDescByKey = (arr: any[], key: string) =>
  arr.sort((a, b) => _get(b, key).localeCompare(_get(a, key)));
