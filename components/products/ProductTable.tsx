"use client";

import { useState } from "react";

import { Table, Button, Space } from "antd";
import type { ColumnsType } from "antd/es/table";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

import EditProductModal from "@/components/products/EditProductModal";
import ConfirmDeleteModal from "@/components/products/ConfirmDeleteModal";
import type { Product } from "@/types/product";

interface Props {
  data: Product[];
  loading: boolean;
  currentPage: number;
  pageSize: number;
  totalData: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
  onDelete: (id: string) => void;
}

const ProductTable: React.FC<Props> = ({
  data,
  loading,
  currentPage,
  pageSize,
  totalData,
  onPageChange,
  onPageSizeChange,
  onDelete,
}) => {
  const [selectedEditProduct, setSelectedEditProduct] =useState<Product | null>(null);
  const [selectedDeleteProduct, setSelectedDeleteProduct] = useState<Product | null>(null);

  const handleSelectEditProduct = (id: string) => {
    const [selectedData] = data.filter((row) => row.product_id === id);
    setSelectedEditProduct(selectedData);
  };

  const handleSelectDeleteProduct = (id: string) => {
    const [selectedData] = data.filter((row) => row.product_id === id);
    setSelectedDeleteProduct(selectedData);
  };

  const columns: ColumnsType<Product> = [
    {
      title: "Product Title",
      dataIndex: "product_title",
      key: "product_title",
      align: "center",
    },
    {
      title: "Price",
      dataIndex: "product_price",
      key: "product_price",
      align: "center",
      render: (price: number) => `Rp ${price.toLocaleString("id-ID")}`,
    },
    {
      title: "Category",
      dataIndex: "product_category",
      key: "product_category",
      align: "center",
    },
    {
      title: "Description",
      dataIndex: "product_description",
      key: "product_description",
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
          <Button
            type="link"
            onClick={() => handleSelectEditProduct(record.product_id)}
          >
            <EditOutlined style={{ fontSize: "1.25rem" }} />
          </Button>
          <Button
            type="link"
            danger
            onClick={() => handleSelectDeleteProduct(record.product_id)}
          >
            <DeleteOutlined style={{ fontSize: "1.25rem" }} />
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
            total: totalData,
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
        openedProduct={selectedEditProduct}
        onCancel={() => setSelectedEditProduct(null)}
      />

      <ConfirmDeleteModal
        openedProduct={selectedDeleteProduct}
        onCancel={() => setSelectedDeleteProduct(null)}
      />
    </>
  );
};

export default ProductTable;
