import { CommonStatusEnum } from "@/enums";
import { getCommonStatusLabel } from "@/utils/common";
import { Form, Radio } from "antd";

/**
 * 用于添加/修改Form的状态表单项组件
 */
const StatusFormItem: React.FC = () => (
  <Form.Item label="是否开启" name="status">
    <Radio.Group>
      <Radio value={CommonStatusEnum.AVAILABLE}>{getCommonStatusLabel(CommonStatusEnum.AVAILABLE)}</Radio>
      <Radio value={CommonStatusEnum.DISABLED}>{getCommonStatusLabel(CommonStatusEnum.DISABLED)}</Radio>
    </Radio.Group>
  </Form.Item>
);

export default StatusFormItem;
