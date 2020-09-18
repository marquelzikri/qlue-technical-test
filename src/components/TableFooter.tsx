import React from 'react';
import classNames from 'classnames';

function TableFooterPageButton({
  clickHandler,
  isActive,
  children
}: { clickHandler?: Function, isActive?: boolean, children?: React.ReactNode }) {
  return (
    <button
      className={classNames(
        "-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm leading-5 font-medium text-blue-500 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-tertiary active:text-gray-700 transition ease-in-out duration-150 hover:bg-tertiary",
        {
          "font-bold text-blue-700 cursor-default": isActive
        }
      )}
      onClick={() => clickHandler ? clickHandler() : null}
    >
      {children}
    </button>
  );
}

export default function TableFooter({
  currentPage,
  setCurrentPage,
  isLastPage
}: { currentPage: number, setCurrentPage: Function, isLastPage: boolean }) {
  return (
    <div className="flex justify-center mt-4">
      <nav className="relative z-0 inline-flex shadow-sm">
        <button
          className={classNames(
            "relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm leading-5 font-medium focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150",
            {
              "text-gray-700 hover:text-gray-600": currentPage > 1,
              "text-gray-300 cursor-default": currentPage === 1
            }
          )}
          disabled={currentPage === 1}
          aria-label="Previous"
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        </button>
        {
          (currentPage === 1 && !isLastPage) && (
            <>
              <TableFooterPageButton isActive>
                1
              </TableFooterPageButton>
              <TableFooterPageButton clickHandler={() => setCurrentPage(2)}>
                2
              </TableFooterPageButton>
              <TableFooterPageButton clickHandler={() => setCurrentPage(3)}>
                3
              </TableFooterPageButton>
            </>
          )
        }
        {
          (currentPage > 1 && !isLastPage) && (
            <>
              <TableFooterPageButton clickHandler={() => setCurrentPage(currentPage - 1)}>
                {currentPage - 1}
              </TableFooterPageButton>
              <TableFooterPageButton isActive>
                {currentPage}
              </TableFooterPageButton>
              <TableFooterPageButton clickHandler={() => setCurrentPage(currentPage + 1)}>
                {currentPage + 1}
              </TableFooterPageButton>
            </>
          )
        }
        {
          (currentPage > 1 && isLastPage) && (
            <>
              {
                currentPage - 2 > 0 && (
                  <TableFooterPageButton clickHandler={() => setCurrentPage(currentPage - 2)}>
                    {currentPage - 2}
                  </TableFooterPageButton>
                )
              }
              {
                currentPage - 1 > 0 && (
                  <TableFooterPageButton clickHandler={() => setCurrentPage(currentPage - 1)}>
                    {currentPage - 1}
                  </TableFooterPageButton>
                )
              }
              <TableFooterPageButton isActive>
                {currentPage}
              </TableFooterPageButton>
            </>
          )
        }
        <button
          className={classNames(
            "-ml-px relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm leading-5 font-medium focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150",
            {
              "text-gray-700 hover:text-gray-600": !isLastPage,
              "text-gray-300 cursor-default": isLastPage
            }
          )}
          disabled={isLastPage}
          aria-label="Next"
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
          </svg>
        </button>
      </nav>
    </div>
  );
}