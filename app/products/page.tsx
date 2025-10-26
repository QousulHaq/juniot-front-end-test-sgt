"use client";

import dynamic from "next/dynamic";
import { useEffect, useMemo, useState } from "react";
import { Button, Input, Space, theme, message, Alert } from "antd";
import { debounce } from "lodash";

import ProductTable from "@/components/products/ProductTable";
import CreateProductModal from "@/components/products/CreateProductModal";
import { useGetAllProducts } from "@/hooks/products/useProducts";

const SearchOutlined = dynamic(
  () => import("@ant-design/icons/SearchOutlined"),
  { ssr: false }
);
const PlusOutlined = dynamic(() => import("@ant-design/icons/PlusOutlined"), {
  ssr: false,
});

const ProductPage = () => {
  const {
    token: { colorPrimary },
  } = theme.useToken();

  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [offsetPage, setOffsetPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalData, setTotalData] = useState(0);
  const [openCreate, setOpenCreate] = useState(false);

  const {
    data: productData,
    isLoading: productLoading,
    error: productError,
    isSuccess: productSuccess,
    refetch: refetchProduct,
  } = useGetAllProducts({
    limit: pageSize,
    offset: offsetPage,
    page: currentPage,
    search: search,
  });

  // Handle error notification
  useEffect(() => {
    if (productError) {
      console.error("Product fetch error:", productError);
      message.error("Failed to fetch product data. Please try again later.");
    }
  }, [productError]);

  // Update total data when fetch succeeds
  useEffect(() => {
    const { total } = productData?.pagination || {};
    setTotalData(total || 0);
  }, [productSuccess, productData]);

  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
    handleSearch(e.target.value);
  };

  const handleSearch = useMemo(
    () =>
      debounce((value: string) => {
        setSearch(value);
        setCurrentPage(1);
      }, 300),
    []
  );

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
          value={searchInput}
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
          <span className="hidden md:inline">Create</span> Product
        </Button>
      </Space>

      {/* Error state */}
      {productError && (
        <Alert
          message="Error"
          description="Unable to load products. Please refresh the page or try again later."
          type="error"
          showIcon
          className="mb-4"
          action={
            <Button onClick={() => refetchProduct()} size="small">
              Retry
            </Button>
          }
        />
      )}

      {/* Product Table */}
      <div className="overflow-x-auto">
        <ProductTable
          data={productData?.data || []}
          loading={productLoading}
          currentPage={currentPage}
          pageSize={pageSize}
          totalData={totalData}
          onPageChange={setCurrentPage}
          onPageSizeChange={setPageSize}
          onDelete={() => {}}
        />
      </div>

      {/* Create Modal */}
      <CreateProductModal
        open={openCreate}
        onCancel={() => setOpenCreate(false)}
      />
    </div>
  );
};

export default ProductPage;
