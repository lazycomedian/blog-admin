import { CommonStatusEnum } from "@/enums";
import { logger, tips } from "@/utils";
import { getCommonStatusLabel } from "@/utils/common";
import { useRequest } from "ahooks";
import { Switch } from "antd";
import React, { memo } from "react";

const { AVAILABLE, DISABLED } = CommonStatusEnum;

interface StatusSwitchProps {
  record: any;
  rowKey?: string;
  service: (id: number, status: CommonStatusEnum) => Promise<any>;
  onChange?: (data: any) => void;
  disabled?: boolean;
}

const StatusSwitch: React.FC<StatusSwitchProps> = props => {
  const { service = async () => logger.warning("@/components/StatusSwitch", "缺少修改状态接口"), rowKey = "id", record } = props;

  const { loading, run: update } = useRequest(service, {
    manual: true,
    onSuccess: props.onChange,
    onError: e => tips.error(e.message)
  });

  return (
    <Switch
      loading={loading}
      disabled={props.disabled}
      onChange={checked => update(record[rowKey], checked ? AVAILABLE : DISABLED)}
      checked={record.status === AVAILABLE}
      checkedChildren={getCommonStatusLabel(AVAILABLE)}
      unCheckedChildren={getCommonStatusLabel(DISABLED)}
    />
  );
};

export default memo(StatusSwitch);
