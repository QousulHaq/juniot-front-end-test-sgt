import { useState, useEffect } from "react";
import { Modal, Form, Input, InputNumber, message, Row, Col } from "antd";
import { useQueryClient } from "@tanstack/react-query";

import type { Product } from "@/types/product";
import { useEditProduct } from "@/hooks/products/useProduct";

interface Props {
  openedProduct: Product | null;
  onCancel: () => void;
}

const EditProductModal: React.FC<Props> = ({ openedProduct, onCancel }) => {
  const [form] = Form.useForm();
  const [confirmLoading, setConfirmLoading] = useState(false);
  const queryClient = useQueryClient();

  const { mutate: editProduct } = useEditProduct({
    onSuccess: () => {
      message.success("✅ Product successfully updated!");
      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey[0] === "products",
      });
      setConfirmLoading(false);
      form.resetFields();
      onCancel();
    },
    onError: (error: any) => {
      setConfirmLoading(false);

      const errorMsg =
        error?.response?.data?.message ||
        error?.message ||
        "❌ Failed to update product. Please try again later.";

      console.error("Error editing product:", error);
      message.error(errorMsg);
    },
  });

  const handleOk = async () => {
    if (!openedProduct) {
      message.warning("No product selected to edit.");
      return;
    }

    try {
      setConfirmLoading(true);
      const values = await form.validateFields();
      console.log("isi dari form", values);
      console.log("isi dari number", Number(values.product_price));

      editProduct({
        product_id: openedProduct.product_id,
        ...values,
      });
    } catch {
      setConfirmLoading(false);
      message.warning("Please fill all required fields correctly.");
    }
  };

  useEffect(() => {
    if (openedProduct) {
      form.setFieldsValue({
        product_title: openedProduct.product_title,
        product_price: openedProduct.product_price,
        product_category: openedProduct.product_category,
        product_description: openedProduct.product_description,
      });
    }
  }, [openedProduct, form]);

  return (
    <Modal
      title={
        openedProduct
          ? `Edit Product "${openedProduct.product_title}"`
          : "Edit Product"
      }
      open={openedProduct !== null}
      onCancel={() => {
        form.resetFields();
        onCancel();
      }}
      onOk={handleOk}
      confirmLoading={confirmLoading}
      okText="Update"
      destroyOnClose
      centered
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          product_title: openedProduct?.product_title,
          product_price: openedProduct?.product_price,
          product_category: openedProduct?.product_category,
          product_description: openedProduct?.product_description,
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

export default EditProductModal;
