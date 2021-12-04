import { useEffect, useState, Dispatch, SetStateAction } from 'react';
import useSWR from 'swr';
import { CountryModel } from '../models/covid19';
import { fetcher } from '../utils';
import config from '../config';

// TODO: change when swr properly types error response
type Error = any;

export const useCovidList = (): [
  CountryModel[] | undefined,
  Dispatch<SetStateAction<CountryModel[] | undefined>>,
  Error,
] => {
  const {
    features: {
      covid19: { endpoint },
    },
  } = config;
  const [covidList, setCovidList] = useState<CountryModel[] | undefined>();
  const { data, error } = useSWR<CountryModel[]>(`${endpoint}/covid-19/countries`, fetcher, {
    revalidateOnFocus: false,
  });

  useEffect(() => {
    if (data) setCovidList(data);
  }, [data]);

  return [covidList, setCovidList, error];
};
