import { useEffect, useState, Dispatch, SetStateAction } from 'react';
import useSWR from 'swr';
import { CountryModel } from '../models';
import { fetcher } from '../../../utils';
import config from '../config';

// TODO: change when swr properly types error response
type Error = any;

const { endpoint } = config;

export const useCovidList = (): [
  CountryModel[] | undefined,
  Dispatch<SetStateAction<CountryModel[] | undefined>>,
  Error,
] => {
  const [covidList, setCovidList] = useState<CountryModel[] | undefined>();
  const { data, error } = useSWR<CountryModel[]>(`${endpoint}/covid-19/countries`, fetcher, {
    revalidateOnFocus: false,
  });

  useEffect(() => {
    if (data) setCovidList(data);
  }, [data]);

  return [covidList, setCovidList, error];
};

export const useCovidDetail = (country: string): [CountryModel | undefined, Error] => {
  const [covidDetail, setCovidDetail] = useState<CountryModel | undefined>();
  const { data, error } = useSWR<CountryModel>(`${endpoint}/covid-19/countries/${country}`, fetcher, {
    revalidateOnFocus: false,
  });

  useEffect(() => {
    if (data) setCovidDetail(data);
  }, [data]);

  return [covidDetail, error];
};
