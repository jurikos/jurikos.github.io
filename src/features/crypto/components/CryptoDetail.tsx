import { FC } from 'react';
import { Alert, Spinner, ButtonGroup, Button } from 'react-bootstrap';
import Chart from 'react-apexcharts';
import CryptoRouteDictionary from '../routes';
import { CryptoTitle } from '../enums';
import { useCryptoDetailData, useCryptoHistory } from '../hooks';
import { formatPrice } from '../../../utils';
import config from '../config';
import PageMeta from '../../../components/shared/PageMeta';
import Breadcrumbs from '../../../components/shared/Breadcrumbs';
import PageHeading from '../../../components/shared/PageHeading';
import Percent from '../../../components/shared/Percent';

interface CryptoDetailProps {
  code: string;
}

const CryptoDetail: FC<CryptoDetailProps> = ({ code }) => {
  const cryptoCode = code.toUpperCase();
  const {
    charts: { timeframes },
  } = config;

  const cryptoDetailData = useCryptoDetailData(cryptoCode);
  const [cryptoHistory, chartSeries, timeframe, setTimeframe, cryptoHistoryError] = useCryptoHistory(cryptoCode);
  const loading = !cryptoDetailData || !cryptoHistory || !chartSeries;

  if (cryptoHistoryError)
    return (
      <Alert variant="danger" className="my-5">
        Something went wrong
      </Alert>
    );

  if (loading) return <Spinner animation="border" className="my-5" />;

  const { name, image, price, changePct24h } = cryptoDetailData;

  return (
    <>
      <PageMeta title={name} />
      <Breadcrumbs crumbs={[{ title: CryptoTitle.Base, url: CryptoRouteDictionary.Index }, { title: name }]} />
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
