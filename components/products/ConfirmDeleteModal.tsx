"use client";

import React from "react";
import { Modal, Typography } from "antd";

const { Text } = Typography;

interface ConfirmDeleteModalProps {
  openedId: string | null;
  onCancel: () => void;
  onConfirm: () => void;
  productName?: string;
  loading?: boolean;
}

const ConfirmDeleteModal: React.FC<ConfirmDeleteModalProps> = ({
  openedId,
  onCancel,
  onConfirm,
  productName,
  loading = false,
}) => {
  return (
    <Modal
      title="Confirm Delete"
      open={openedId !== null}
      onOk={onConfirm}
      onCancel={onCancel}
      okText="Delete"
      okType="danger"
      cancelText="Cancel"
      confirmLoading={loading}
      centered
    >
      <div className="space-y-2">
        <Text>
          Are you sure you want to delete &nbsp;
          <Text strong>
            {productName ? `"${productName}"` : "this product"}
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
