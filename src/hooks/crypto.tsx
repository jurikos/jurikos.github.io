import { useEffect, useState, Dispatch, SetStateAction } from 'react';
import useSWR from 'swr';
import {
  CryptoApiStatusEnum,
  CryptoListDataModel,
  CryptoListModel,
  CryptoHistoryDataModel,
  CryptoHistoryModel,
} from '../models/crypto';
import { fetcher } from '../utils';
import config from '../config';

const {
  features: {
    charts: { timeframes },
    crypto: { endpoint },
  },
} = config;

// TODO: change when swr properly types error response
type Error = any;

export const useCryptoList = (): [
  CryptoListDataModel[] | undefined,
  Dispatch<SetStateAction<CryptoListDataModel[] | undefined>>,
  Error,
] => {
  const [cryptoList, setCryptoList] = useState<CryptoListDataModel[] | undefined>();
  const [responseError, setResponseError] = useState(false);
  const { data, error } = useSWR<CryptoListModel>(`${endpoint}/top/mktcapfull?limit=100&tsym=USD`, fetcher, {
    revalidateOnFocus: false,
  });

  useEffect(() => {
    if (data) {
      const { Message, Data } = data;
      Message === CryptoApiStatusEnum.Success ? setCryptoList(Data) : setResponseError(true);
    }
  }, [data]);

  return [cryptoList, setCryptoList, error || responseError];
};

type Timeframe = {
  title: string;
  limit: number;
  aggregate: number;
};

type ChartSeries = any[] | undefined;

type CryptoHistory = CryptoHistoryDataModel[] | undefined;

export const useCryptoHistory = (
  cryptoCode: string,
): [CryptoHistory, ChartSeries, Timeframe, Dispatch<SetStateAction<Timeframe>>, Error] => {
  const [cryptoHistory, setCryptoHistory] = useState<CryptoHistory>(undefined);
  const [timeframe, setTimeframe] = useState<Timeframe>(timeframes[0]);
  const [chartSeries, setChartSeries] = useState<ChartSeries>();
  const [responseError, setResponseError] = useState(false);
  const { data, error } = useSWR<CryptoHistoryModel>(
    `${endpoint}/histoday?fsym=${cryptoCode}&tsym=USD&limit=${timeframe.limit}&aggregate=${timeframe.aggregate}&allData=false`,
    fetcher,
  );

  useEffect(() => {
    if (data) {
      const { Response, Data } = data;

      if (Response === CryptoApiStatusEnum.Success) {
        setCryptoHistory(Data);
        setChartSeries([
          {
            data: Data.map(({ time, open, high, low, close }) => {
              return {
                x: time * 1000,
                y: [open, high, low, close],
              };
            }),
          },
        ]);
        return;
      }

      setResponseError(true);
    }
  }, [data]);

  return [cryptoHistory, chartSeries, timeframe, setTimeframe, error || responseError];
};

interface CryptoDetail {
  code: string;
  name: string;
  image: string;
  price: number;
  changePct24h: number;
}

export const useCryptoDetailData = (code: string): CryptoDetail | null => {
  const [cryptoList, , cryptoListError] = useCryptoList();
  const cryptoDetailData = cryptoList?.find((item) => item.CoinInfo.Name === code);

  if (!cryptoList || cryptoListError || !cryptoDetailData) return null;

  const {
    CoinInfo: { FullName: name, ImageUrl: image },
    RAW: {
      USD: { PRICE: price, CHANGEPCT24HOUR: changePct24h },
    },
  } = cryptoDetailData;

  return { code, name, image, price, changePct24h };
};
