import FormModal from "@/components/FormModal";
import { CommonStatusEnum, getModalTypeLabel, ModalTypeEnum, statusOptions } from "@/constants";
import { useTable } from "@/hooks";
import { useModalRef } from "@/hooks/modal";
import { RoleModel } from "@/model/role";
import { RoleService } from "@/service/api";
import { tips } from "@/utils";
import { PlusOutlined } from "@ant-design/icons";
import { useMemoizedFn, useResetState } from "ahooks";
import { Button, Form, Input, Radio, Select, Space, Table } from "antd";
import React, { useState } from "react";
import { useColumns } from "./lib";

const RoleManagement: React.FC = () => {
  const [submitLoading, setSubmitLoading] = useState(false);

  const [currentRecord, setCurrentRecord, resetCurrentRecord] = useResetState<Partial<RoleModel>>({
    status: CommonStatusEnum.AVAILABLE
  });

  const formModalRef = useModalRef();

  const columns = useColumns({
    reload: () => getList(),
    onEdit: (v, r) => {
      setCurrentRecord(r);
      formModalRef.current?.show(ModalTypeEnum.EDIT);
    }
  });

  /**
   * 获取列表数据
   */
  const { run: getList, tableProps } = useTable(RoleService.queryList, {
    defaultPageSize: 15,
    defaultCurrent: 1
  });

  /**
   * 添加/编辑保存
   *
   * @param record
   * @param modalType
   */
  const submit = useMemoizedFn(async (result: RoleModel, modalType?: ModalTypeEnum) => {
    setSubmitLoading(true);
    const prefixTips = modalType ? getModalTypeLabel(modalType) : "操作";

    try {
      if (modalType === ModalTypeEnum.EDIT && currentRecord.id) await RoleService.modify(currentRecord.id, result);
      else await RoleService.create(result);
      tips.success(prefixTips + "成功");
      getList();
      formModalRef.current?.close();
    } catch (error) {
      tips.error(prefixTips + "失败");
    } finally {
      setSubmitLoading(false);
    }
  });

  return (
    <Space size="large" direction="vertical">
      {/* 查询 */}
      <Form layout="inline">
        <Space size="large">
          <Form.Item label="状态" name="status">
            <Select
              options={statusOptions}
              placeholder="请选择"
              allowClear
              style={{ width: 214 }}
              onChange={status => getList({ status })}
            />
          </Form.Item>
          <Form.Item label="角色名称" name="roleName">
            <Input.Search enterButton allowClear placeholder="请输入角色名称" onSearch={roleName => getList({ roleName })} />
          </Form.Item>
        </Space>
      </Form>

      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={() => {
          resetCurrentRecord();
          formModalRef.current?.show();
        }}
      >
        添加身份
      </Button>

      {/* 表格 */}
      <Table rowKey="id" columns={columns} {...tableProps} scroll={{ x: true }} />

      {/* 弹窗 */}
      <FormModal<RoleModel>
        ref={formModalRef}
        title="角色"
        loading={submitLoading}
        initialValues={currentRecord}
        onSubmit={submit}
      >
        <Form.Item label="角色名称" name="roleName" rules={[{ required: true, message: "请输入角色名称" }]}>
          <Input placeholder="请输入角色名称" />
        </Form.Item>
        <Form.Item label="是否显示" name="status">
          <Radio.Group>
            <Radio value={CommonStatusEnum.AVAILABLE}>开启</Radio>
            <Radio value={CommonStatusEnum.DISABLED}>关闭</Radio>
          </Radio.Group>
        </Form.Item>
      </FormModal>
    </Space>
  );
};

export default RoleManagement;
