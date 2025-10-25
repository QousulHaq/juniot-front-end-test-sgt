"use client";

import { useState } from "react";
import { Table, Button, Space } from "antd";
import type { ColumnsType } from "antd/es/table";
import { EditIcon, TrashIcon } from "lucide-react";
import {EditOutlined, DeleteOutlined} from "@ant-design/icons"
import EditProductModal from "./EditProductModal";
import ConfirmDeleteModal from "./ConfirmDeleteModal";

interface Product {
  id: number;
  title: string;
  price: number;
  category: string;
  description: string;
}

interface Props {
  data: Product[];
  loading: boolean;
  currentPage: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
  onDelete: (id: number) => void;
}

const ProductTable: React.FC<Props> = ({
  data,
  loading,
  currentPage,
  pageSize,
  onPageChange,
  onPageSizeChange,
  onDelete,
}) => {
  const [selectedEditProduct, setSelectedEditProduct] = useState<number | null>(
    null
  );
  const [selectedDeleteProduct, setSelectedDeleteProduct] = useState<number | null>(
    null
  );
  const [loadingDelete, setLoadingDelete] = useState(false);

  const handleEditProduct = (product: Product) => {
    console.log("Edited product:", product);
  };

  const handleDeleteProduct = () => {
    console.log("Edited product:");
  };

  const columns: ColumnsType<Product> = [
    {
      title: "Product Title",
      dataIndex: "title",
      key: "title",
      align: "center",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      align: "center",
      render: (price: number) => `Rp ${price.toLocaleString("id-ID")}`,
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      align: "center",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      align: "center",
      render: (text: string) =>
        text.length > 40 ? `${text.substring(0, 40)}...` : text,
    },
    {
      title: "Actions",
      key: "actions",
      align: "center",
      render: (_, record) => (
        <Space>
          <Button type="link" onClick={() => setSelectedEditProduct(record.id)}>
            <EditOutlined style={{fontSize:"1.25rem"}}/>
          </Button>
          <Button type="link" danger onClick={() => setSelectedDeleteProduct(record.id)}>
            <DeleteOutlined style={{fontSize:"1.25rem"}}/>
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <>
      <div className="table-container p-4 border border-border-light dark:border-border-dark rounded-lg bg-white dark:bg-neutral-700 shadow-sm">
        <Table
          columns={columns}
          dataSource={data}
          rowKey="id"
          loading={loading}
          pagination={{
            current: currentPage,
            pageSize,
            total: data.length,
            onChange: (page, size) => {
              onPageChange(page);
              onPageSizeChange(size || 5);
            },
            showSizeChanger: true,
            pageSizeOptions: ["5", "10", "20"],
          }}
        />
      </div>
      <EditProductModal
        openedId={selectedEditProduct}
        onCancel={() => setSelectedEditProduct(null)}
        onCreate={handleEditProduct}
      />
       <ConfirmDeleteModal
        openedId={selectedDeleteProduct}
        onCancel={() => setSelectedDeleteProduct(null)}
        onConfirm={handleDeleteProduct}
        loading={loadingDelete}
        productName={ data.find(p => p.id === selectedDeleteProduct)?.title }
      />
    </>
  );
};

export default ProductTable;
