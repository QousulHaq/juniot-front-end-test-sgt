"use client";

import React, { useState } from "react";
import { Modal, Typography, message } from "antd";
import { useQueryClient } from "@tanstack/react-query";

import { useDeleteProduct } from "@/hooks/products/useProduct";
import { Product } from "@/types/product";

const { Text } = Typography;

interface ConfirmDeleteModalProps {
  openedProduct: Product | null;
  onCancel: () => void;
}

const ConfirmDeleteModal: React.FC<ConfirmDeleteModalProps> = ({
  openedProduct,
  onCancel,
}) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const queryClient = useQueryClient();

  const { mutate: deleteProduct } = useDeleteProduct({
    onSuccess: () => {
      message.success("Product successfully deleted ✅");
      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey[0] === "products",
      });
      setConfirmLoading(false);
      onCancel();
    },
    onError: (error: any) => {
      setConfirmLoading(false);

      // Ambil pesan error yang lebih jelas (dari API atau fallback)
      const errorMsg =
        error?.response?.data?.message ||
        error?.message ||
        "Failed to delete product. Please try again later.";

      console.error("Error deleting product:", error);
      message.error(errorMsg);
    },
  });

  const handleOk = () => {
    if (!openedProduct) {
      message.warning("No product selected to delete.");
      return;
    }

    setConfirmLoading(true);
    deleteProduct(openedProduct.product_id);
  };

  return (
    <Modal
      title="Confirm Delete"
      open={openedProduct !== null}
      onOk={handleOk}
      onCancel={onCancel}
      okText="Delete"
      okType="danger"
      cancelText="Cancel"
      confirmLoading={confirmLoading}
      centered
      destroyOnClose
    >
      <div className="space-y-2">
        <Text>
          Are you sure you want to delete{" "}
          <Text strong>
            {openedProduct
              ? `"${openedProduct?.product_title}"`
              : "this product"}
          </Text>
          ?
        </Text>
        <br />
        <Text type="secondary">This action cannot be undone.</Text>
      </div>
    </Modal>
  );
};

export default ConfirmDeleteModal;
