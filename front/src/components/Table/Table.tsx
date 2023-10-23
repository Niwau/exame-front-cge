/* eslint-disable react/jsx-key */
import { Column, useFilters, usePagination, useSortBy, useTable } from 'react-table';
import { Box } from '../Box';
import { Search } from '../Input';
import { ArrowDown, ArrowUp } from '@phosphor-icons/react';
import { PaginationButton } from './PaginationButton';
import { Children } from '@/types/Children';

interface TableProps<T extends {}> {
  columns: Column<T>[];
  data: T[];
  title?: string;
  columnFilterId?: string;
  Button?: React.ReactNode;
}

export const Table = <T extends {}>({ columns, data, title, columnFilterId = 'name', Button }: TableProps<T>) => {
  const table = useTable(
    {
      columns,
      data,
      initialState: {
        pageSize: 5,
        pageIndex: 0
      }
    },
    useFilters,
    useSortBy,
    usePagination
  );

  const handeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    table.setFilter(columnFilterId, e.target.value);
  };

  return (
    <Box className="p-8 m-auto">
      <section className="flex flex-col gap-6 mb-6">
        <TableTitle>{title}</TableTitle>
        <div className="flex justify-between gap-4">
          <Search onChange={handeSearch} />
          <div>{Button}</div>
        </div>
      </section>

      <table className="table-auto" {...table.getTableProps()}>
        <thead>
          {table.headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  className="uppercase text-xs font-normal opacity-70 text-white bg-[#353040] text-start py-2 px-3 border-b-[1px] border-[#433E51]"
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                >
                  <div className="flex items-center">
                    {column.render('Header')}
                    <span>
                      {column.isSorted ? column.isSortedDesc ? <ArrowDown size={16} /> : <ArrowUp size={16} /> : ''}
                    </span>
                  </div>
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody {...table.getTableBodyProps()}>
          {table.page.map((row, index) => {
            table.prepareRow(row);
            return (
              <tr
                className={`text-base ${
                  index % 2 == 0 ? '' : 'bg-[#353040]'
                } font-normal text-white text-start border-b-[1px] border-[#433E51]`}
                {...row.getRowProps()}
              >
                {row.cells.map((cell) => {
                  return (
                    <td className="py-2 px-3" {...cell.getCellProps()}>
                      {cell.render('Cell')}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>

      <section className="flex flex-1 justify-between items-center mt-6">
        <TableInfo pageIndex={table.state.pageIndex} pagesLength={table.pageCount} />
        <section className="flex gap-2">
          <PaginationButton type="previous" onClick={table.previousPage} disabled={!table.canPreviousPage} />
          <PaginationButton type="next" onClick={table.nextPage} disabled={!table.canNextPage} />
        </section>
      </section>
    </Box>
  );
};

const TableTitle = ({ children }: Children) => {
  return <h1 className="text-white font-semibold text-2xl">{children}</h1>;
};

interface TableInfoProps {
  pageIndex: number;
  pagesLength: number;
}

const TableInfo = ({ pageIndex, pagesLength }: TableInfoProps) => {
  return (
    <p className="text-white opacity-70">
      Página {pageIndex + 1} de {pagesLength}
    </p>
  );
};
