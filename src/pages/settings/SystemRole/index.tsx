import FormModal from "@/components/FormModal";
import { CommonStatusEnum, getModalTypeLabel, ModalTypeEnum } from "@/constants";
import { useTable } from "@/hooks";
import { useModalRef } from "@/hooks/modal";
import { SysRoleModel } from "@/model/sysRole";
import { SysRoleService } from "@/service/api";
import { tips } from "@/utils";
import { StatusFormItem, StatusQueryFormItem } from "@/utils/common";
import { PlusOutlined } from "@ant-design/icons";
import { useMemoizedFn, useResetState } from "ahooks";
import { Button, Form, Input, Space, Table } from "antd";
import React, { useState } from "react";
import { useColumns } from "./lib";

/**
 * 角色管理模块
 *
 */
const SystemRole: React.FC = () => {
  const [submitLoading, setSubmitLoading] = useState(false);

  const [currentRecord, setCurrentRecord, resetCurrentRecord] = useResetState<Partial<SysRoleModel>>({
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
  const { run: getList, tableProps } = useTable(SysRoleService.queryList, {
    defaultPageSize: 15,
    defaultCurrent: 1,
    loadingDelay: 200
  });

  /**
   * 添加/编辑保存
   *
   * @param record
   * @param modalType
   */
  const submit = useMemoizedFn(async (result: SysRoleModel, modalType?: ModalTypeEnum) => {
    setSubmitLoading(true);
    const prefixTips = modalType ? getModalTypeLabel(modalType) : "操作";

    try {
      if (modalType === ModalTypeEnum.EDIT && currentRecord.id) await SysRoleService.modify(currentRecord.id, result);
      else await SysRoleService.create(result);
      tips.success(prefixTips + "成功");
      getList();
      formModalRef.current?.close();
    } catch (error: any) {
      tips.error(error?.message);
    } finally {
      setSubmitLoading(false);
    }
  });

  return (
    <Space size="large" direction="vertical">
      {/* 查询 */}
      <Form layout="inline">
        <Space size="large">
          <StatusQueryFormItem onChange={status => getList({ status })} />
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
      <FormModal<SysRoleModel>
        ref={formModalRef}
        title="角色"
        loading={submitLoading}
        initialValues={currentRecord}
        onSubmit={submit}
      >
        <Form.Item label="角色名称" name="roleName" rules={[{ required: true, message: "请输入角色名称" }]}>
          <Input placeholder="请输入角色名称" />
        </Form.Item>
        <StatusFormItem />
      </FormModal>
    </Space>
  );
};

export default SystemRole;
