import React, { Suspense, useEffect, useState } from 'react';

import useFetch from './hooks/useFetch';

const Table = React.lazy(() => import('./components/Table'));
const TableFooter = React.lazy(() => import('./components/TableFooter'));

import useFetch from './hooks/useFetch';

const Table = React.lazy(() => import('./components/Table'));
const TableFooter = React.lazy(() => import('./components/TableFooter'));

export default function App() {
  const { response, isLoading, setUrl } = useFetch({ initialUrl: "https://swapi.dev/api/people" });

  const [dataTable, setDataTable] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const toTitleCase = (phrase: string) => {
    return phrase
      .toLowerCase()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const replaceAll = (str: string, find: string, replace: string) => {
    return str.replace(new RegExp(find, 'g'), replace);
  }

  useEffect(() => {
    if (response?.results) {
      let filteredDataTable: any = [];
      response.results.forEach((result: any) => {
        let filteredTableDatum: any = {};

        Object.keys(result).forEach((oldKey: string) => {
          // Capitalize data key and replace underscores with spaces
          const newKey = toTitleCase(replaceAll(oldKey, "_", " "));

          if (['name', 'height', 'mass', 'hair_color', 'skin_color'].includes(oldKey)) {
            filteredTableDatum[newKey] = result[oldKey];
          }

        });

      });

      setDataTable(filteredDataTable);
    }
  }, [response]);

  useEffect(() => {
    setUrl("https://swapi.dev/api/people/?page=" + currentPage);
  }, [currentPage, setUrl]);

  return (
    <>
      <div className="bg-blue-700 flex flex-col h-24 justify-center">
        <div className="mx-4">
          <img style={{ height: "70px" }} src="https://www.qlue.co.id/images/logo.png" alt="Qlue Performa Indonesia" />
        </div>
      </div>
      <div className="p-4">
        <h1 className="text-lg font-bold text-gray-700">Table</h1>
        <Suspense fallback={<div>Loading Table...</div>}>
          <Table
            data={dataTable}
            isLoading={isLoading}
            footer={
              <TableFooter
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                isLastPage={response?.next === null}
              />
            }
          />
        </Suspense>
      </div>
    </>
  );
}
