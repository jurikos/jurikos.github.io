import { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import { Alert, Spinner, Form, Table } from 'react-bootstrap';
import { useCovidList } from '../../hooks/covid19';
import {
  arrSortAscByKey,
  arrSortDescByKey,
  arrSortStringAscByKey,
  arrSortStringDescByKey,
  formatNumber,
} from '../../utils';
import PageMeta from '../shared/PageMeta';
import Breadcrumbs from '../shared/Breadcrumbs';
import PageHeading from '../shared/PageHeading';
import TableHeadingSort from '../shared/TableHeadingSort';

const CovidList: FC = () => {
  const [covidList, setCovidList, error] = useCovidList();
  const [search, setSearch] = useState('');
  const title = 'Covid19';

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
      <Breadcrumbs className="my-3" crumbs={[{ title: 'Covid19' }]} />
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
