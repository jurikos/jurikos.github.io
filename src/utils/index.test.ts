import {
  removeProtocolFromUrl,
  formatPrice,
  formatNumber,
  arrSortAscByKey,
  arrSortDescByKey,
  arrSortStringAscByKey,
  arrSortStringDescByKey,
} from './';
import { mockCountriesCovidData, mockCountriesCovidDataReverse } from '../features/covid19/mocks';

test('remove protocol from https://www.onpolar.com to equal www.onpolar.com', () =>
  expect(removeProtocolFromUrl('https://www.onpolar.com')).toBe('www.onpolar.com'));

test('format 48087.82 to equal $48,087.82', () => expect(formatPrice(48087.82)).toBe('$48,087.82'));

test('format 1201730 to equal 201,730', () => expect(formatNumber(1201730)).toBe('1,201,730'));

test('array sorted ASC by key', () =>
  expect(arrSortAscByKey([...mockCountriesCovidData], 'deaths')).toStrictEqual(mockCountriesCovidDataReverse));

test('array sorted DESC by key', () =>
  expect(arrSortDescByKey([...mockCountriesCovidDataReverse], 'deaths')).toStrictEqual(mockCountriesCovidData));

test('array alphabetically sorted ASC by key', () =>
  expect(arrSortStringAscByKey([...mockCountriesCovidDataReverse], 'country')).toStrictEqual(mockCountriesCovidData));

test('array alphabetically sorted DESC by key', () =>
  expect(arrSortStringDescByKey([...mockCountriesCovidData], 'country')).toStrictEqual(mockCountriesCovidDataReverse));
