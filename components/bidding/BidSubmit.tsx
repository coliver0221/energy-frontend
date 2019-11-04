import React, { FunctionComponent, forwardRef, useEffect } from 'react';
import MaterialTable, { Column } from 'material-table';

import dayjs from 'dayjs';

const BidSubmitHeaders = {
  'Content-Type': 'application/json',
  Authorization:
    'Bearer 3MaTIcta709SxWZ88OkaLjKvNzgfFkxqr8WemUjeOKLZcImscV6WcziuFyfrbXjc',
};

const url_bidsubmit = 'http://140.116.247.120:5000/bidsubmit';

interface IProps {
  bid_type: string;
}

interface Row {
  uuid: string;
  date: string;
  time: number;
  volume: number;
  price: number;
  total_price: number;
}

interface TableState {
  columns: Array<Column<Row>>;
}

const Field: TableState = {
  columns: [
    {
      field: 'uuid',
      title: 'uuid',
      type: 'string',
      hidden: true,
    },
    {
      field: 'date',
      title: '日期',
      type: 'date',
      cellStyle: {
        textAlign: 'center',
        width: '120px',
      },
      render: rowData => dayjs(rowData.date).format('YYYY/MM/DD'),
    },
    {
      field: 'time',
      title: '時段',
      lookup: {
        0: '0:00-1:00',
        1: '1:00-2:00',
        2: '2:00-3:00',
        3: '3:00-4:00',
        4: '4:00-5:00',
        5: '5:00-6:00',
        6: '6:00-7:00',
        7: '7:00-8:00',
        8: '8:00-9:00',
        9: '9:00-10:00',
        10: '10:00-11:00',
        11: '11:00-12:00',
        12: '12:00-13:00',
        13: '13:00-14:00',
        14: '14:00-15:00',
        15: '15:00-16:00',
        16: '16:00-17:00',
        17: '17:00-18:00',
        18: '18:00-19:00',
        19: '19:00-20:00',
        20: '20:00-21:00',
        21: '21:00-22:00',
        22: '22:00-23:00',
        23: '23:00-24:00',
      },
      cellStyle: { textAlign: 'center' },
    },
    {
      field: 'volume',
      title: '度數',
      cellStyle: { textAlign: 'center', width: '120px' },
    },
    {
      field: 'price',
      title: '單價',
      cellStyle: { textAlign: 'center', width: '120px' },
    },
    {
      field: 'total_price',
      title: '總金額',
      editable: 'never',
      cellStyle: { textAlign: 'center' },
    },
  ],
};

const BiddingTable: React.FC<IProps> = ({ bid_type }) => {
  const [state] = React.useState<TableState>(Field);

  return (
    <MaterialTable
      title={bid_type}
      options={{
        actionsColumnIndex: -1,
        search: false,
        headerStyle: {
          textAlign: 'right',
        },
      }}
      columns={state.columns}
      data={query =>
        new Promise((resolve, reject) => {
          let url = url_bidsubmit;
          url += '?per_page=' + query.pageSize;
          url += '&page=' + (query.page + 1);
          url += '&bid_type=' + bid_type;
          fetch(url, {
            method: 'get',
            headers: new Headers(BidSubmitHeaders),
          })
            .then(response => response.json())
            .then(result => {
              resolve({
                data: result.data,
                page: result.page - 1,
                totalCount: result.totalCount,
              });
            });
        })
      }
      editable={{
        onRowAdd: newData =>
          new Promise(resolve => {
            setTimeout(() => {
              let data = {
                date: dayjs(newData['date']).format('YYYY/MM/DD'),
                bid_type: bid_type,
                start_time:
                  dayjs(newData['date']).format('YYYY/MM/DD ') +
                  newData['time'],
                end_time:
                  dayjs(newData['date']).format('YYYY/MM/DD ') +
                  (Number(newData['time']) + 1),
                value: newData['volume'],
                price: newData['price'],
              };
              fetch(url_bidsubmit, {
                method: 'post',
                headers: new Headers(BidSubmitHeaders),
                body: JSON.stringify(data),
              })
                .then(response => response.json())
                .then(response => console.log(response));
              resolve();
            }, 600);
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise(resolve => {
            setTimeout(() => {
              let data = {
                id: oldData['id'],
                date: dayjs(newData['date']).format('YYYY/MM/DD'),
                bid_type: bid_type,
                start_time:
                  dayjs(newData['date']).format('YYYY/MM/DD ') +
                  newData['time'],
                end_time:
                  dayjs(newData['date']).format('YYYY/MM/DD ') +
                  (Number(newData['time']) + 1),
                value: newData['volume'],
                price: newData['price'],
              };
              fetch(url_bidsubmit, {
                method: 'put',
                headers: new Headers(BidSubmitHeaders),
                body: JSON.stringify(data),
              })
                .then(response => response.json())
                .then(response => console.log(response));
              resolve();
            }, 600);
          }),
        onRowDelete: oldData =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              let data = { id: oldData['id'] };
              fetch(url_bidsubmit, {
                method: 'delete',
                headers: new Headers(BidSubmitHeaders),
                body: JSON.stringify(data),
              })
                .then(response => response.json())
                .then(response => console.log(response));
              resolve();
            }, 600);
          }),
      }}
    />
  );
};

export default BiddingTable;
