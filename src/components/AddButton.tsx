import { PlusOutlined } from "@ant-design/icons";
import { Button, ButtonProps } from "antd";
import React, { memo } from "react";

const AddButton: React.FC<ButtonProps> = props => {
  return <Button type="primary" icon={<PlusOutlined />} {...props}></Button>;
};

export default memo(AddButton);
