export enum CryptoApiStatusEnum {
  Success = 'Success',
  Error = 'Error',
}

interface CoinInfoModel {
  Name: string;
  FullName: string;
  ImageUrl: string;
  MaxSupply: number;
}

interface PriceDataModel {
  PRICE: number;
  CHANGEPCT24HOUR: number;
  SUPPLY: number;
  MKTCAP: number;
}

export interface CryptoHistoryDataModel {
  close: number;
  high: number;
  low: number;
  open: number;
  time: number;
}

export interface CryptoListDataModel {
  CoinInfo: CoinInfoModel;
  RAW: { USD: PriceDataModel };
}

export interface CryptoListModel {
  Data: CryptoListDataModel[];
  Message: string;
}

export interface CryptoHistoryModel {
  Data: CryptoHistoryDataModel[];
  Response: CryptoApiStatusEnum;
}
