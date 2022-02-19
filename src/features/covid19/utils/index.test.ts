import fetchMock from 'jest-fetch-mock';
import { fetcher } from '../../../utils';
import { mockEstoniaCovidData } from '../mocks';
import config from '../config';

const { endpoint } = config;

beforeEach(() => fetchMock.resetMocks());

it('response result is mockEstoniaCovidData', async () => {
  fetchMock.mockResponseOnce(
    JSON.stringify({
      result: mockEstoniaCovidData,
    }),
  );
  const res = await fetcher(`${endpoint}/covid-19/countries/estonia`);
  expect(res.result).toStrictEqual(mockEstoniaCovidData);
  expect(fetchMock.mock.calls.length).toEqual(1);
});
