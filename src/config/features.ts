const features = {
  charts: {
    timeframes: [
      {
        title: '1 Month',
        limit: 30,
        aggregate: 1,
      },
      {
        title: '1 Year',
        limit: 30 * 12,
        aggregate: 1,
      },
      {
        title: '3 Years',
        limit: 30 * (12 * 3),
        aggregate: 1,
      },
      {
        title: '5 Years',
        limit: 30 * (12 * 5),
        aggregate: 1,
      },
    ],
  },
  covid19: {
    endpoint: 'https://disease.sh/v3',
  },
  crypto: {
    endpoint: 'https://min-api.cryptocompare.com/data',
  },
};

export default features;
