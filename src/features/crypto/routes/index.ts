type CryptoRoutes = 'Index' | 'Detail';

const CryptoRouteDictionary: { [key in CryptoRoutes]: string } = {
  Index: '/features/crypto',
  Detail: '/features/crypto/:code',
};

export default CryptoRouteDictionary;
