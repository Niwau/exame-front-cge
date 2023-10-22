/* eslint-disable react/jsx-key */
import { Column, useFilters, usePagination, useSortBy, useTable } from 'react-table';
import { Box } from './Box';
import { Input } from './Input';
import { CaretLeft, CaretRight, ArrowDown, ArrowUp, MagnifyingGlass, Plus } from '@phosphor-icons/react';

interface TableProps<T extends {}> {
  columns: Column<T>[];
  data: T[];
  title?: string;
  columnFilterId?: string;
  Button?: React.ReactNode;
}

export const Table = <T extends {}>({ columns, data, title, columnFilterId = 'name', Button }: TableProps<T>) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    state,
    page,
    setFilter
  } = useTable(
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
    setFilter(columnFilterId, e.target.value);
  };

  return (
    <Box className="p-8 m-auto">
      <section className="flex flex-col gap-6 mb-6">
        <h1 className="text-white font-semibold text-2xl">{title}</h1>
        <div className="flex justify-between gap-4">
          <Input
            LeftIcon={<MagnifyingGlass color="white" size={20} weight='duotone' />}
            onChange={handeSearch}
            containerStyle="basis-[40%]"
            placeholder="Pesquisar..."
          />
          <div>
            { Button }
          </div>
        </div>
      </section>
      <table className="table-auto" {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
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

        <tbody {...getTableBodyProps()}>
          {page.map((row, index) => {
            prepareRow(row);
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
        <p className="text-white opacity-70">
          {state.pageIndex * state.pageSize + 1} - {(state.pageIndex + 1) * state.pageSize} de {rows.length}
        </p>
        <section className="flex gap-2">
          <CaretLeft
            onClick={previousPage}
            cursor={canPreviousPage ? 'pointer' : 'not-allowed'}
            color="white"
            opacity={canPreviousPage ? 1 : 0.6}
            size={20}
          />
          <CaretRight
            onClick={nextPage}
            cursor={canNextPage ? 'pointer' : 'not-allowed'}
            color="white"
            opacity={canNextPage ? 1 : 0.6}
            size={20}
          />
        </section>
      </section>
    </Box>
  );
};
