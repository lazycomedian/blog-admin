import AddButton from "@/components/AddButton";
import FormModal, { useFormModalRef } from "@/components/FormModal";
import { CommonStatusEnum, getModalTypeLabel, ModalTypeEnum } from "@/constants";
import { useTableRequest } from "@/hooks";
import { SaveOrUpdateModel } from "@/model/common";
import { SysRoleModel } from "@/model/settings";
import { SysRoleService } from "@/service/api";
import { tips } from "@/utils";
import { StatusFormItem, StatusQueryFormItem } from "@/utils/render";
import { useMemoizedFn } from "ahooks";
import { Form, Input, Space, Table } from "antd";
import React, { useState } from "react";
import { useColumns } from "./lib";

/**
 * 角色管理模块
 *
 */
const SystemRole: React.FC = () => {
  const [submitLoading, setSubmitLoading] = useState(false);

  // 表单弹窗控制器
  const formModalRef = useFormModalRef<Partial<SysRoleModel>>({ status: CommonStatusEnum.AVAILABLE });

  const columns = useColumns({
    reload: () => getList(),
    onEdit: (v, r) => formModalRef.show(ModalTypeEnum.EDIT, r)
  });

  /**
   * 获取列表数据
   */
  const { run: getList, tableProps } = useTableRequest(SysRoleService.queryList, {
    defaultPageSize: 15,
    defaultCurrent: 1,
    onError: error => tips.error(error.message)
  });

  /**
   * 添加/编辑保存
   *
   * @param result 表单内容
   */
  const submit = useMemoizedFn(async (result: SaveOrUpdateModel<SysRoleModel>) => {
    setSubmitLoading(true);
    const modalType = formModalRef.getModalType();
    const prefixTips = getModalTypeLabel(modalType);
    if (modalType === ModalTypeEnum.EDIT) result.id = formModalRef.currentRecord?.id;

    try {
      await SysRoleService.saveOrUpdate(result);
      tips.success(prefixTips + "成功");
      getList();
      formModalRef.close();
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
          <Form.Item label="搜索" name="roleName">
            <Input.Search enterButton allowClear placeholder="请输入角色名称" onSearch={content => getList({ content })} />
          </Form.Item>
        </Space>
      </Form>

      <AddButton onClick={() => formModalRef.show(ModalTypeEnum.ADD)}>添加角色</AddButton>

      {/* 表格 */}
      <Table rowKey="id" columns={columns} {...tableProps} scroll={{ x: true }} />

      {/* 弹窗 */}
      <FormModal
        ref={formModalRef}
        title="角色"
        loading={submitLoading}
        initialValues={formModalRef.currentRecord}
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
