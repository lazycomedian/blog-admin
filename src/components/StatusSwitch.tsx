import { CommonStatusEnum } from "@/enums";
import { logger, tips } from "@/utils";
import { getCommonStatusLabel } from "@/utils/biz";
import { useRequest } from "ahooks";
import { Switch } from "antd";
import React, { memo } from "react";

const { AVAILABLE, DISABLED } = CommonStatusEnum;

interface StatusSwitchProps {
  record: any;
  service: (id: number, status: CommonStatusEnum) => Promise<any>;
  rowKey?: string;
  onChange?: (data: any) => void;
}

const StatusSwitch: React.FC<StatusSwitchProps> = props => {
  const { service = async () => logger.warning("StatusSwitch: 缺少修改状态接口"), onChange, rowKey = "id", record } = props;

  const { loading, run: update } = useRequest(service, {
    manual: true,
    onSuccess: onChange,
    onError: e => tips.error(e.message)
  });

  return (
    <Switch
      loading={loading}
      onChange={checked => update(record[rowKey], checked ? AVAILABLE : DISABLED)}
      checked={record.status === AVAILABLE}
      checkedChildren={getCommonStatusLabel(AVAILABLE)}
      unCheckedChildren={getCommonStatusLabel(DISABLED)}
    />
  );
};

export default memo(StatusSwitch);
