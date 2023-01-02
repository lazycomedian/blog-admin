import AddButton from "@/components/AddButton";
import FormModal, { useFormModalRef } from "@/components/FormModal";
import { CommonStatusEnum, getModalTypeLabel, ModalTypeEnum } from "@/constants";
import { useTableRequest } from "@/hooks";
import { SaveOrUpdateModel } from "@/model/common";
import { SysAdminModel } from "@/model/settings";
import { SysAdminService } from "@/service/api";
import { tips } from "@/utils";
import { StatusFormItem, StatusQueryFormItem } from "@/utils/render";
import { useMemoizedFn } from "ahooks";
import { Form, Input, Select, Space, Table } from "antd";
import React, { useState } from "react";
import { useColumns } from "./lib";

/**
 * 管理员列表模块
 *
 */
const SystemAdmin: React.FC = () => {
  const [submitLoading, setSubmitLoading] = useState(false);

  // 表单弹窗控制器
  const formModalRef = useFormModalRef<Partial<SysAdminModel>>({ status: CommonStatusEnum.AVAILABLE });

  const columns = useColumns({
    reload: () => getList(),
    onEdit: (v, r) => formModalRef.show(ModalTypeEnum.EDIT, r)
  });

  /**
   * 获取列表数据
   */
  const { run: getList, tableProps } = useTableRequest(SysAdminService.queryList, {
    onError: error => tips.error(error.message)
  });

  /**
   * 添加/编辑保存
   *
   * @param record
   */
  const submit = useMemoizedFn(async (result: SaveOrUpdateModel<SysAdminModel>) => {
    setSubmitLoading(true);
    const modalType = formModalRef.getModalType();
    const prefixTips = getModalTypeLabel(modalType);
    if (modalType === ModalTypeEnum.EDIT) result.id = formModalRef.currentRecord?.id;

    try {
      await SysAdminService.saveOrUpdate(result);
      tips.success(prefixTips + "成功");
      getList();
      formModalRef.close();
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
          <StatusQueryFormItem onChange={status => getList({ status })} />
          <Form.Item label="搜索" name="nickname">
            <Input.Search enterButton allowClear placeholder="请输入昵称或者账号" onSearch={content => getList({ content })} />
          </Form.Item>
        </Space>
      </Form>

      <AddButton onClick={() => formModalRef.show()}>添加管理员</AddButton>

      {/* 表格 */}
      <Table rowKey="id" columns={columns} {...tableProps} scroll={{ x: true }} />

      {/* 弹窗 */}
      <FormModal
        ref={formModalRef}
        title="管理员"
        loading={submitLoading}
        initialValues={formModalRef.currentRecord}
        onSubmit={submit}
      >
        <Form.Item label="管理员账号" name="username" rules={[{ required: true, message: "请输入管理员账号" }]}>
          <Input placeholder="请输入管理员账号" />
        </Form.Item>
        <Form.Item label="管理员密码" name="password" rules={[{ required: true, message: "请输入管理员密码" }]}>
          <Input.Password placeholder="请输入管理员密码" />
        </Form.Item>
        <Form.Item label="确认密码" name="confirmPassword" rules={[{ required: true, message: "请输入确认密码" }]}>
          <Input.Password placeholder="请再次输入密码" />
        </Form.Item>
        <Form.Item label="管理员昵称" name="nickname" rules={[{ required: true, message: "请输入管理员昵称" }]}>
          <Input placeholder="请输入管理员昵称" />
        </Form.Item>
        <Form.Item label="管理员角色" name="role" rules={[{ required: true, message: "请选择管理员角色" }]}>
          <Select placeholder="请选择管理员角色" />
        </Form.Item>
        <StatusFormItem />
      </FormModal>
    </Space>
  );
};

export default SystemAdmin;
