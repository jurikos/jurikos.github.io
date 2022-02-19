import { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import { Alert, Spinner, Form, Table } from 'react-bootstrap';
import { Covid19Title } from '../enums';
import { useCovidList } from '../hooks';
import {
  arrSortAscByKey,
  arrSortDescByKey,
  arrSortStringAscByKey,
  arrSortStringDescByKey,
  formatNumber,
} from '../../../utils';
import PageMeta from '../../../components/shared/PageMeta';
import Breadcrumbs from '../../../components/shared/Breadcrumbs';
import PageHeading from '../../../components/shared/PageHeading';
import TableHeadingSort from '../../../components/shared/TableHeadingSort';

const CovidList: FC = () => {
  const [covidList, setCovidList, error] = useCovidList();
  const [search, setSearch] = useState('');
  const title = Covid19Title.Base;

  if (error)
    return (
      <Alert variant="danger" className="my-5">
        Something went wrong
      </Alert>
    );

  if (!covidList) return <Spinner animation="border" className="my-5" />;

  const tableHeadings = [
    { title: 'Country', key: 'country', sortByString: true },
    { title: 'Cases today', key: 'todayCases' },
    { title: 'Cases total', key: 'cases' },
    { title: 'Deaths today', key: 'todayDeaths' },
    { title: 'Deaths total', key: 'deaths' },
  ];

  return (
    <>
      <PageMeta title={title} />
      <Breadcrumbs crumbs={[{ title }]} />
      <PageHeading title={title} />
      <Form.Control
        size="lg"
        type="search"
        placeholder="Search by country..."
        className="mb-4"
        onChange={(e) => setSearch(e.target.value)}
      />
      <Table responsive striped bordered hover>
        <thead>
          <tr>
            {tableHeadings.map(({ title, key, sortByString }) => (
              <TableHeadingSort
                key={key}
                title={title}
                onAsc={() =>
                  setCovidList([
                    ...(sortByString ? arrSortStringAscByKey(covidList, key) : arrSortAscByKey(covidList, key)),
                  ])
                }
                onDesc={() =>
                  setCovidList([
                    ...(sortByString ? arrSortStringDescByKey(covidList, key) : arrSortDescByKey(covidList, key)),
                  ])
                }
              />
            ))}
          </tr>
        </thead>
        <tbody>
          {covidList
            .filter(({ country }) => country.toLowerCase().includes(search.toLowerCase()))
            .map(({ country, todayCases, cases, todayDeaths, deaths, countryInfo: { flag } }) => (
              <tr key={country}>
                <td>
                  <img loading="lazy" style={{ width: '1rem' }} alt={country} src={flag} />{' '}
                  <Link to={country.toLowerCase()}>{country}</Link>
                </td>
                <td>{todayCases > 0 ? <strong>{formatNumber(todayCases)}</strong> : formatNumber(todayCases)}</td>
                <td>{formatNumber(cases)}</td>
                <td>
                  {todayDeaths > 0 ? (
                    <strong className="text-danger">{formatNumber(todayDeaths)}</strong>
                  ) : (
                    formatNumber(todayDeaths)
                  )}
                </td>
                <td>{deaths > 0 ? <strong>{formatNumber(deaths)}</strong> : formatNumber(deaths)}</td>
              </tr>
            ))}
        </tbody>
      </Table>
    </>
  );
};

export default CovidList;
