import { FC } from 'react';
import { Alert, Spinner, Row, Col, Table } from 'react-bootstrap';
import Chart from 'react-apexcharts';
import Covid19RouteDictionary from '../routes';
import { Covid19Title } from '../enums';
import { useCovidDetail } from '../hooks';
import { formatNumber } from '../../../utils';
import PageMeta from '../../../components/shared/PageMeta';
import Breadcrumbs from '../../../components/shared/Breadcrumbs';
import PageHeading from '../../../components/shared/PageHeading';

interface CovidDetailProps {
  country: string;
}

const CovidDetail: FC<CovidDetailProps> = ({ country }) => {
  const [covidDetail, error] = useCovidDetail(country);

  if (error)
    return (
      <Alert variant="danger" className="my-5">
        Something went wrong
      </Alert>
    );

  if (!covidDetail) return <Spinner animation="border" className="my-5" />;

  const {
    country: countryName,
    population,
    cases,
    deaths,
    recovered,
    todayCases,
    todayDeaths,
    todayRecovered,
    critical,
  } = covidDetail;
  const baseTitle = Covid19Title.Base;
  const title = `${countryName} ${baseTitle} stats`;

  return (
    <>
      <PageMeta title={title} />
      <Breadcrumbs
        className="my-3"
        crumbs={[{ title: baseTitle, url: Covid19RouteDictionary.Index }, { title: countryName }]}
      />
      <PageHeading title={title} />
      <Row>
        <Col md={6}>
          <Table striped bordered hover responsive>
            <tbody>
              <tr>
                <th>Population</th>
                <td>{formatNumber(population)}</td>
              </tr>
              <tr>
                <th>Cases total</th>
                <td>{formatNumber(cases)}</td>
              </tr>
              <tr>
                <th>Deaths total</th>
                <td>
                  {formatNumber(deaths)} ({((deaths / cases) * 100).toFixed(2)}%)
                </td>
              </tr>
              <tr>
                <th>Recovered total</th>
                <td>{formatNumber(recovered)}</td>
              </tr>
              <tr>
                <th>Cases today</th>
                <td>{formatNumber(todayCases)}</td>
              </tr>
              <tr>
                <th>Deaths today</th>
                <td>{formatNumber(todayDeaths)}</td>
              </tr>
              <tr>
                <th>Recovered today</th>
                <td>{formatNumber(todayRecovered)}</td>
              </tr>
              <tr>
                <th>Critical</th>
                <td>{formatNumber(critical)}</td>
              </tr>
            </tbody>
          </Table>
        </Col>
        <Col md={6}>
          <Chart
            options={{
              labels: ['Cases', 'Deaths', 'Recovered'],
              colors: ['var(--bs-blue)', 'var(--bs-red)', 'var(--bs-green)'],
              tooltip: {
                y: {
                  formatter: (val) => formatNumber(val),
                },
              },
            }}
            series={[cases, deaths, recovered]}
            type="donut"
          />
        </Col>
      </Row>
    </>
  );
};

export default CovidDetail;
