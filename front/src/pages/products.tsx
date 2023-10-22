import { Highlight } from '@/components/Highlight';
import { Table } from '@/components/Table';
import DashboardLayout from '@/layouts/DashboardLayout';
import { ProductInterface } from '@/types/ProductInterface';
import { useMemo } from 'react';
import { Column } from 'react-table';
import { AddProductModal } from '@/components/Product/AddProductModal';
import { useProducts } from '@/services/api';
import { EditProductModal } from '@/components/Product/EditProductModal';

export default function Products() {

  const { data, error } = useProducts()

  const columns = useMemo<Column<ProductInterface>[]>(
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
        Header: 'Preço',
        accessor: 'price',
        Cell: (price) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(price.value)
      },
      {
        Header: 'Quantidade',
        accessor: 'quantity'
      },
      {
        Header: 'Categoria',
        accessor: 'category',
        Cell: (row) => row.value ? <Highlight label={row.value.name} color={row.value.color}/> : <p className='text-center'>---</p>,
        disableSortBy: true
      },
      {
        Header: 'Editar',
        id: 'edit',
        accessor: (product) => <EditProductModal {...product}/>,
        disableSortBy: true,
      }
    ],
    []
  );

  return (
    <DashboardLayout>
      <Table Button={<AddProductModal/>} title="Produtos" columns={columns} data={data?.data ?? []} />
    </DashboardLayout>
  );
}