'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import dynamic from 'next/dynamic';
import { useTable } from '@/hooks/use-table';
import { useColumn } from '@/hooks/use-column';
import { Button } from '@/components/ui/button';
import ControlledTable from '@/components/controlled-table';
import { getColumns } from '@/app/shared/module/news/product-list/columns';
import { deleteNewsByIdAPI, getAllNews } from '@/redux/actions/newsActions';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/redux/store';
const FilterElement = dynamic(
  () => import('@/app/shared/module/news/product-list/filter-element'),
  { ssr: false }
);
const TableFooter = dynamic(() => import('@/app/shared/table-footer'), {
  ssr: false,
});

const filterState = {
  price: ['', ''],
  createdAt: [null, null],
  status: '',
};

export default function ProductsTable({ data = [] }: { data: any[] }) {
  
  const [pageSize, setPageSize] = useState(5);
  const dispatch = useDispatch<AppDispatch>();
 

  const {
    isLoading,
    currentPage,
    totalItems,
    tableData,
    handlePaginate,
    sortConfig,
    handleSort,
    selectedRowKeys,
    setSelectedRowKeys,
    handleDelete,
  } = useTable(data, pageSize, filterState);

  const onDeleteItem = useCallback((id: string) => {
    handleDelete(id);
    dispatch(deleteNewsByIdAPI(id))
      .unwrap()
      .then((res) => {
        console.log(res, 'res');
        if (res?.success) {
          dispatch(getAllNews());
        }
      });
  }, [dispatch, handleDelete]);

  const columns = useMemo(
    () =>
      getColumns({
        data: tableData,
        sortConfig,
        checkedItems: selectedRowKeys,
        onHeaderCellClick: (value: string) => ({
          onClick: () => {
            handleSort(value);
          },
        }),
        onDeleteItem,
        onChecked: (id: string) => {
          setSelectedRowKeys((keys) => [...keys, id]);
        },
        handleSelectAll: (checked: boolean) => {
          if (checked) {
            setSelectedRowKeys(tableData.map((item) => item.id));
          } else {
            setSelectedRowKeys([]);
          }
        },
      }),
    [
      tableData,
      sortConfig,
      selectedRowKeys,
      handleSort,
      onDeleteItem,
      setSelectedRowKeys,
    ]
  );

  const { visibleColumns } = useColumn(columns);

  return (
    <>
      <ControlledTable
      isLoading={isLoading}
      data={data}
      columns={visibleColumns}
      paginatorOptions={{
        pageSize,
        setPageSize,
        total: totalItems,
        current: currentPage,
        onChange: handlePaginate,
      }}
      tableFooter={
        <TableFooter
          checkedItems={selectedRowKeys}
          handleDelete={(ids: string[]) => {
            setSelectedRowKeys([]);
            handleDelete(ids);
          }}
        >
          <Button size="sm" className="dark:bg-gray-300 dark:text-gray-800">
            Download {selectedRowKeys.length} {selectedRowKeys.length > 1 ? 'Products' : 'Product'}
          </Button>
        </TableFooter>
      }
    />
    </>
  );
}
