import { FC } from 'react';
import { Alert, Spinner, ButtonGroup, Button } from 'react-bootstrap';
import Chart from 'react-apexcharts';
import { useCryptoList, useCryptoHistory } from '../../hooks/crypto';
import { formatPrice } from '../../utils';
import config from '../../config';
import PageHeading from '../shared/PageHeading';
import Percent from '../shared/Percent';

interface CryptoDetailProps {
  code: string;
}

const CryptoDetail: FC<CryptoDetailProps> = ({ code }) => {
  const cryptoCode = code.toUpperCase();
  const {
    features: {
      charts: { timeframes },
    },
  } = config;

  const [cryptoList, , cryptoListError] = useCryptoList();
  const [cryptoHistory, chartSeries, timeframe, setTimeframe, cryptoHistoryError] = useCryptoHistory(cryptoCode);
  const error = cryptoListError || cryptoHistoryError;
  const loading = !cryptoList || !cryptoHistory || !chartSeries;

  if (error)
    return (
      <Alert variant="danger" className="my-5">
        Something went wrong
      </Alert>
    );

  if (loading) return <Spinner animation="border" className="my-5" />;

  const cryptoDetailData = cryptoList.find((item) => item.CoinInfo.Name === cryptoCode);

  if (!cryptoDetailData) return <Alert variant="warning">Not found</Alert>;

  const {
    CoinInfo: { FullName: name, ImageUrl: image },
  } = cryptoDetailData;
  const { PRICE: price, CHANGEPCT24HOUR: changePct24h } = cryptoDetailData.RAW.USD;

  return (
    <>
      <PageHeading title={name} />
      <div className="mb-5">
        <div className="d-flex align-items-center fs-2">
          <img loading="lazy" alt={name} src={`https://www.cryptocompare.com/${image}`} style={{ width: '4rem' }} />
          <strong className="mx-4">{formatPrice(price)}</strong>
          <Percent amount={changePct24h} />
        </div>
      </div>
      <ButtonGroup aria-label="Timeframe" className="mb-5">
        {timeframes.map((item) => (
          <Button
            key={item.title}
            variant={item === timeframe ? 'primary' : 'secondary'}
            onClick={() => {
              setTimeframe(item);
            }}
          >
            {item.title}
          </Button>
        ))}
      </ButtonGroup>
      <Chart
        options={{
          chart: {
            type: 'candlestick',
            animations: {
              enabled: false,
            },
            toolbar: {
              tools: {
                zoom: false,
                zoomin: false,
                zoomout: false,
                selection: false,
                pan: false,
                reset: false,
              },
            },
          },
          title: {
            text: `${cryptoCode} / USD Price Chart`,
            align: 'left',
          },
          xaxis: {
            type: 'datetime',
          },
          yaxis: {
            tooltip: {
              enabled: true,
            },
          },
        }}
        series={chartSeries}
        type="candlestick"
        height={350}
      />
    </>
  );
};

export default CryptoDetail;
