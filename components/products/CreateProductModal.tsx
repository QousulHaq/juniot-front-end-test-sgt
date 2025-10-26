import { useState } from "react";
import { Modal, Form, Input, InputNumber, Row, Col, message } from "antd";
import { useQueryClient } from "@tanstack/react-query";

import { useCreateProduct } from "@/hooks/products/useProduct";
import type { Product } from "@/types/product";

interface Props {
  open: boolean;
  onCancel: () => void;
}

const CreateProductModal: React.FC<Props> = ({ open, onCancel }) => {
  const [form] = Form.useForm();
  const [confirmLoading, setConfirmLoading] = useState(false);
  const queryClient = useQueryClient();

  const { mutate: createProduct } = useCreateProduct({
    onSuccess: () => {
      message.success("✅ Product successfully created!");
      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey[0] === "products",
      });
      setConfirmLoading(false);
      form.resetFields();
      onCancel();
    },
    onError: (error: any) => {
      setConfirmLoading(false);

      // Ambil pesan error dari server, jika tersedia
      const errorMsg =
        error?.response?.data?.message ||
        error?.message ||
        "❌ Failed to create product. Please try again later.";

      console.error("Error creating product:", error);
      message.error(errorMsg);
    },
  });

  const handleOk = async () => {
    try {
      setConfirmLoading(true);
      const values = await form.validateFields();
      createProduct(values);
    } catch (validationError) {
      // Jika form tidak valid, hentikan loading
      setConfirmLoading(false);
      message.warning("Please fill all required fields correctly.");
    }
  };

  return (
    <Modal
      title="Create New Product"
      open={open}
      onCancel={() => {
        form.resetFields();
        onCancel();
      }}
      onOk={handleOk}
      confirmLoading={confirmLoading}
      okText="Create"
      destroyOnClose
      centered
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          product_title: "",
          product_price: "0",
          product_category: "",
          product_description: "",
        }}
      >
        {/* Product Title */}
        <Form.Item
          label="Product Title"
          name="product_title"
          rules={[{ required: true, message: "Please input the title!" }]}
        >
          <Input placeholder="Enter product title" />
        </Form.Item>

        {/* Product Price */}
        <Form.Item label="Price" required>
          <Input.Group compact>
            <Input
              style={{ width: "60px", textAlign: "center" }}
              disabled
              value="Rp"
            />
            <Form.Item
              name="product_price"
              noStyle
              rules={[{ required: true, message: "Please input the price!" }]}
            >
              <InputNumber
                min={0}
                style={{ width: "calc(100% - 60px)" }}
                inputMode="numeric"
                formatter={(value) =>
                  `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ".")
                }
                parser={
                  ((value: string | undefined) =>
                    Number(value?.replace(/\./g, "") || 0)) as unknown as (
                    displayValue: string | undefined
                  ) => 0
                }
              />
            </Form.Item>
          </Input.Group>
        </Form.Item>

        {/* Product Category */}
        <Form.Item
          label="Product Category"
          name="product_category"
          rules={[{ required: true, message: "Please input the category!" }]}
        >
          <Input placeholder="Enter product category" />
        </Form.Item>

        {/* Description */}
        <Form.Item label="Description" name="product_description">
          <Input.TextArea rows={3} placeholder="Enter product description" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateProductModal;
