import fetchMock from 'jest-fetch-mock';
import {
  fetcher,
  removeProtocolFromUrl,
  formatPrice,
  formatNumber,
  arrSortAscByKey,
  arrSortDescByKey,
  arrSortStringAscByKey,
  arrSortStringDescByKey,
  getMovieImg,
} from './';
import { mockEstoniaCovidData, mockCountriesCovidData, mockCountriesCovidDataReverse } from '../mocks';
import config from '../config';

const {
  features: {
    covid19: { endpoint: covidEndpoint },
  },
} = config;

beforeEach(() => fetchMock.resetMocks());

it('response result is mockEstoniaCovidData', async () => {
  fetchMock.mockResponseOnce(
    JSON.stringify({
      result: mockEstoniaCovidData,
    }),
  );
  const res = await fetcher(`${covidEndpoint}/covid-19/countries/estonia`);
  expect(res.result).toStrictEqual(mockEstoniaCovidData);
  expect(fetchMock.mock.calls.length).toEqual(1);
});

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

test('tmdb image to equal https://image.tmdb.org/t/p/w500/image.jpg', () =>
  expect(getMovieImg('/image.jpg')).toBe('https://image.tmdb.org/t/p/w500/image.jpg'));
