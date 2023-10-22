import { AddCategoryModal } from '@/components/Category/AddCategoryModal';
import { EditCategoryModal } from '@/components/Category/EditCategoryModal';
import { Color } from '@/components/Color';
import { Table } from '@/components/Table';
import DashboardLayout from '@/layouts/DashboardLayout';
import { useCategories } from '@/services/api';
import { CategoryInterface } from '@/types/CategoryInterface';
import { useMemo } from 'react';
import { Column } from 'react-table';

export default function Categories() {
  const { data } = useCategories();

  const columns = useMemo<Column<CategoryInterface>[]>(
    () => [
      {
        Header: 'ID',
        accessor: '_id'
      },
      {
        Header: 'Nome',
        accessor: 'name'
      },
      {
        Header: 'Cor de destaque',
        accessor: 'color',
        Cell: (color) => <Color color={color.value} />
      },
      {
        Header: 'Editar',
        id: 'edit',
        accessor: (category) => <EditCategoryModal {...category} />,
        disableSortBy: true,
      }
    ],
    []
  );

  return (
    <DashboardLayout>
      <Table Button={<AddCategoryModal />} title="Categorias" columns={columns} data={data?.data ?? []} />
    </DashboardLayout>
  );
}
