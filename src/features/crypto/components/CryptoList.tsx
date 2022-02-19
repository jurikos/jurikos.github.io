import { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { Alert, Spinner, Form, Table } from 'react-bootstrap';
import { Heart, HeartFill } from 'react-bootstrap-icons';
import { CryptoTitle } from '../enums';
import favoriteCryptoAtom from '../state/favoriteCryptoAtom';
import { useCryptoList } from '../hooks';
import {
  arrSortAscByKey,
  arrSortDescByKey,
  arrSortStringAscByKey,
  arrSortStringDescByKey,
  formatPrice,
} from '../../../utils';
import PageMeta from '../../../components/shared/PageMeta';
import Breadcrumbs from '../../../components/shared/Breadcrumbs';
import PageHeading from '../../../components/shared/PageHeading';
import TableHeadingSort from '../../../components/shared/TableHeadingSort';
import Percent from '../../../components/shared/Percent';

const CryptoList: FC = () => {
  const [cryptoList, setCryptoList, error] = useCryptoList();
  const [search, setSearch] = useState('');
  const [favoriteCrypto, setFavoriteCrypto] = useRecoilState(favoriteCryptoAtom);
  const title = CryptoTitle.Base;
  const iconColor = 'var(--bs-red)';
  const iconSize = 16;

  if (error)
    return (
      <Alert variant="danger" className="my-5">
        Something went wrong
      </Alert>
    );

  if (!cryptoList) return <Spinner animation="border" className="my-5" />;

  const tableHeadings = [
    { title: 'Code', key: 'CoinInfo.Name', sortByString: true },
    { title: 'Name', key: 'CoinInfo.FullName', sortByString: true },
    { title: 'Price', key: 'RAW.USD.PRICE' },
    { title: '24h %', key: 'RAW.USD.CHANGEPCT24HOUR' },
    { title: 'Market Cap', key: 'RAW.USD.MKTCAP' },
  ];

  return (
    <>
      <PageMeta title={title} />
      <Breadcrumbs crumbs={[{ title }]} />
      <PageHeading title={title} />
      <Form.Control
        size="lg"
        type="search"
        placeholder="Search by currency..."
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
                  setCryptoList([
                    ...(sortByString ? arrSortStringAscByKey(cryptoList, key) : arrSortAscByKey(cryptoList, key)),
                  ])
                }
                onDesc={() =>
                  setCryptoList([
                    ...(sortByString ? arrSortStringDescByKey(cryptoList, key) : arrSortDescByKey(cryptoList, key)),
                  ])
                }
              />
            ))}
            <th />
          </tr>
        </thead>
        <tbody>
          {cryptoList
            .filter(({ CoinInfo: { FullName } }) => FullName.toLowerCase().includes(search.toLowerCase()))
            .map(({ CoinInfo: { Name: code, ImageUrl: image, FullName: name }, RAW }) => {
              if (!RAW?.USD) return null;
              const { MKTCAP: marketCap, PRICE: price, CHANGEPCT24HOUR: changePct24h } = RAW.USD;
              const isFavorite = favoriteCrypto && favoriteCrypto.code === code;

              return (
                <tr key={code}>
                  <td>
                    <img
                      loading="lazy"
                      alt={name}
                      src={`https://www.cryptocompare.com/${image}`}
                      style={{ width: '1.3rem' }}
                      className="me-2"
                    />
                    {code}
                  </td>
                  <td>
                    <Link to={code.toLowerCase()}>{name}</Link>
                  </td>
                  <td>{formatPrice(price)}</td>
                  <td>
                    <Percent amount={changePct24h} />
                  </td>
                  <td>{marketCap ? formatPrice(marketCap) : '-'}</td>
                  <td className="text-center">
                    <span
                      title={!isFavorite ? 'Add to Favorites' : 'Remove from Favorites'}
                      role="button"
                      onClick={() => setFavoriteCrypto(!isFavorite ? { code, image } : null)}
                    >
                      {isFavorite ? (
                        <HeartFill color={iconColor} size={iconSize} />
                      ) : (
                        <Heart color={iconColor} size={iconSize} />
                      )}
                    </span>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </Table>
    </>
  );
};

export default CryptoList;
