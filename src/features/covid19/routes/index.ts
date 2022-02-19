type Covid19Routes = 'Index' | 'Detail';

const Covid19RouteDictionary: { [key in Covid19Routes]: string } = {
  Index: '/features/covid-19',
  Detail: '/features/covid-19/:country',
};

export default Covid19RouteDictionary;
