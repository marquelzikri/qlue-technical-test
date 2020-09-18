import React from 'react';
import classNames from 'classnames';

interface IColumn {
  isBody?: boolean;
  className?: string;
  children?: React.ReactNode;
}

interface ITable {
  data: any[];
  isLoading?: boolean;
  footer?: React.ReactNode;
}

function Column(props: IColumn) {
  const { isBody, className, children } = props;
  const Tag = isBody ? "td" : "th";

  return (
    <Tag className={className ? className : "p-4 whitespace-no-wrap border-b text-blue-900 border-gray-500 text-sm leading-5"}>
      {children}
    </Tag>
  );
}

export default function Table(props: ITable) {
  const { data, isLoading, footer } = props;

  return (
    <div className="overflow-hidden">
      <div
        className={classNames(
          "relative align-middle inline-block w-full overflow-x-auto",
          {
            "h-10": data.length === 0
          }
        )}
      >
        {
          isLoading && (
            <div className="absolute bg-black flex h-full justify-center left-0 opacity-25 top-0 w-full z-10">
              <span className="my-auto text-white">Loading...</span>
            </div>
          )
        }
        {
          data.length > 0 && (
            <table className="min-w-full">
              <thead>
                <tr>
                  {
                    Object.keys(data[0]).map((title: string, index: number) => (
                      <Column key={index} className="p-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">
                        {title}
                      </Column>
                    ))
                  }
                </tr>
              </thead>
              <tbody>
                {
                  data.map((datum: any, index: number) => (
                    <tr key={index}>
                      {
                        Object.values(datum).map((value: unknown, index: number) => (
                          <Column isBody key={index}>
                            {value as string}
                          </Column>
                        ))
                      }
                    </tr>
                  ))
                }
              </tbody>
            </table>
          )
        }
      </div>
      { footer }
    </div>
  );
}
