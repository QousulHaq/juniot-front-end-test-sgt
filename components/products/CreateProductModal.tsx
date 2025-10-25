import { Modal, Form, Input, InputNumber, Select } from "antd";
import { useState } from "react";

interface Product {
  id: number;
  title: string;
  price: number;
  category: string;
  description: string;
}

interface Props {
  open: boolean;
  onCancel: () => void;
  onCreate: (product: Product) => void;
}

const CreateProductModal: React.FC<Props> = ({ open, onCancel, onCreate }) => {
  const [form] = Form.useForm();
  const [confirmLoading, setConfirmLoading] = useState(false);

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        setConfirmLoading(true);
        const newProduct: Product = {
          id: Math.floor(Math.random() * 10000),
          ...values,
        };
        setTimeout(() => {
          onCreate(newProduct);
          setConfirmLoading(false);
          form.resetFields();
        }, 800);
      })
      .catch(() => {});
  };

  return (
    <Modal
      title="Create New Product"
      open={open}
      onCancel={onCancel}
      onOk={handleOk}
      confirmLoading={confirmLoading}
      okText="Create"
    >
      <Form form={form} layout="vertical">
        <Form.Item
          label="Product Title"
          name="title"
          rules={[{ required: true, message: "Please input the title!" }]}
        >
          <Input placeholder="Enter product title" />
        </Form.Item>

        <Form.Item
          label="Price"
          name="price"
          rules={[{ required: true, message: "Please input the price!" }]}
        >
          <InputNumber<number>
            min={0}
            style={{ width: "100%" }}
            formatter={(value) =>
              `Rp ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ".")
            }
            parser={(value) => {
              const numeric = Number(value?.replace(/[Rp.\s]/g, "") || 0);
              return isNaN(numeric) ? 0 : numeric;
            }}
          />
        </Form.Item>

        <Form.Item
          label="Category"
          name="category"
          rules={[{ required: true, message: "Please select category!" }]}
        >
          <Select
            options={[
              { label: "Electronics", value: "Electronics" },
              { label: "Fashion", value: "Fashion" },
              { label: "Home", value: "Home" },
            ]}
          />
        </Form.Item>

        <Form.Item label="Description" name="description">
          <Input.TextArea rows={3} placeholder="Enter product description" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateProductModal;
