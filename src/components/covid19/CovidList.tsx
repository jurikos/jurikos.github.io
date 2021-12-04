import { FC, useState } from 'react';
import { Alert, Spinner, Form, Table } from 'react-bootstrap';
import { useCovidList } from '../../hooks/covid19';
import { arrSortAscByKey, arrSortDescByKey, arrSortStringAscByKey, arrSortStringDescByKey } from '../../utils';
import PageHeading from '../shared/PageHeading';
import TableHeadingSort from '../shared/TableHeadingSort';

const CovidList: FC = () => {
  const [covidList, setCovidList, error] = useCovidList();
  const [search, setSearch] = useState('');

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
      <PageHeading title="Covid19" />
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
                  <img loading="lazy" style={{ width: '1rem' }} alt={country} src={flag} /> {country}
                </td>
                <td>{todayCases > 0 ? <strong>{todayCases}</strong> : todayCases}</td>
                <td>{cases}</td>
                <td>{todayDeaths > 0 ? <strong className="text-danger">{todayDeaths}</strong> : todayDeaths}</td>
                <td>{deaths > 0 ? <strong>{deaths}</strong> : deaths}</td>
              </tr>
            ))}
        </tbody>
      </Table>
    </>
  );
};

export default CovidList;
