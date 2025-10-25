"use client";

import dynamic from "next/dynamic";
import { useEffect, useMemo, useState } from "react";
import { Button, Input, Space, theme } from "antd";
import { debounce } from "lodash";
import ProductTable from "@/components/products/ProductTable";
import CreateProductModal from "@/components/products/CreateProductModal";

const SearchOutlined = dynamic(
  () => import("@ant-design/icons/SearchOutlined"),
  { ssr: false }
);
const PlusOutlined = dynamic(() => import("@ant-design/icons/PlusOutlined"), {
  ssr: false,
});

interface Product {
  id: number;
  title: string;
  price: number;
  category: string;
  description: string;
}

const ProductPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  const [search, setSearch] = useState("");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  const [openCreate, setOpenCreate] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  const {
    token: { colorPrimary },
  } = theme.useToken();

  // Dummy data untuk contoh
  useEffect(() => {
    const dummyData: Product[] = Array.from({ length: 30 }, (_, i) => ({
      id: i + 1,
      title: `Product ${i + 1}`,
      price: 10000 + i * 1500,
      category: i % 2 === 0 ? "Electronics" : "Fashion",
      description: `This is product ${i + 1} description.`,
    }));
    setProducts(dummyData);
    setFilteredProducts(dummyData);
  }, []);

  // Fungsi search dengan debounce
  const handleSearch = useMemo(
    () =>
      debounce((value: string) => {
        const filtered = products.filter((item) =>
          item.title.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredProducts(filtered);
        setCurrentPage(1);
      }, 300),
    [products]
  );

  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);
    handleSearch(value);
  };

  const handleDelete = (id: number) => {
    setFilteredProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const handleCreateProduct = (newProduct: Product) => {
    const updated = [newProduct, ...filteredProducts];
    setFilteredProducts(updated);
    setOpenCreate(false);
  };

  return (
    <div className="p-6">
      <Space
        className="w-full mb-4 flex justify-between items-center"
        align="center"
      >
        {/* Search Input */}
        <Input
          placeholder="Search product..."
          prefix={<SearchOutlined />}
          allowClear
          value={search}
          onChange={onSearchChange}
          className="w-72"
        />

        {/* Create Button */}
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setOpenCreate(true)}
          style={{
            backgroundColor: colorPrimary,
          }}
        >
          <span className="hidden md:inline">Create</span>Product
        </Button>
      </Space>

      <div className="overflow-x-auto">
        <ProductTable
          data={filteredProducts}
          loading={loading}
          currentPage={currentPage}
          pageSize={pageSize}
          onPageChange={setCurrentPage}
          onPageSizeChange={setPageSize}
          onDelete={handleDelete}
        />
      </div>

      <CreateProductModal
        open={openCreate}
        onCancel={() => setOpenCreate(false)}
        onCreate={handleCreateProduct}
      />
    </div>
  );
};

export default ProductPage;
