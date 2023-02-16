import { SysAdminAPI, SysRoleAPI } from "@/api";
import AddButton from "@/components/AddButton";
import BasicSearch from "@/components/BasicSearch";
import FormModal, { useFormModalRef } from "@/components/FormModal";
import StatusFormItem from "@/components/StatusFormItem";
import { SUPER_ADMIN_ID } from "@/constants";
import { CommonStatusEnum, ModalTypeEnum } from "@/enums";
import { useTableRequest } from "@/hooks";
import PageCard from "@/layouts/PageCard";
import PageHeader from "@/layouts/PageHeader";
import { SysAdminModel } from "@/model/settings";
import { tips } from "@/utils";
import { useMemoizedFn, useRequest } from "ahooks";
import { Form, Input, Select, Table } from "antd";
import React from "react";
import { useColumns } from "./lib";

const SystemAdmin: React.FC = () => {
  const formModalRef = useFormModalRef<SysAdminModel>({
    status: CommonStatusEnum.AVAILABLE
  });

  const columns = useColumns({
    reload: () => getList(),
    onEdit: (v, record) => {
      record.roleIds = record.roleList.map(item => item.id);
      formModalRef.show(ModalTypeEnum.EDIT, record);
    }
  });

  const { run: getList, tableProps } = useTableRequest(SysAdminAPI.queryList, {
    onError: error => tips.error(error.message)
  });

  // 获取角色列表
  const { data: roleList = [] } = useRequest(SysRoleAPI.list);

  const submit = useMemoizedFn(async (result: SysAdminModel) => {
    await SysAdminAPI.saveOrUpdate(result);
    getList();
    formModalRef.close();
  });

  return (
    <React.Fragment>
      <PageHeader />
      <PageCard>
        <BasicSearch placeholder="请输入昵称或者账号" onSearch={getList} />
        <AddButton onClick={() => formModalRef.show()}>添加管理员</AddButton>

        <Table rowKey="id" columns={columns} {...tableProps} scroll={{ x: true }} />
      </PageCard>

      {/* modal */}
      <FormModal ref={formModalRef} title="管理员" doubleColumn initialValues={formModalRef.record} onSubmit={submit}>
        <Form.Item label="管理员账号" name="username" rules={[{ required: true, message: "请输入管理员账号" }]}>
          <Input placeholder="请输入管理员账号" />
        </Form.Item>
        <Form.Item label="管理员昵称" name="nickname" rules={[{ required: true, message: "请输入管理员昵称" }]}>
          <Input placeholder="请输入管理员昵称" />
        </Form.Item>
        <Form.Item label="管理员密码" name="password" rules={[{ required: true, message: "请输入管理员密码" }]}>
          <Input.Password placeholder="请输入管理员密码" />
        </Form.Item>
        <Form.Item label="管理员角色" name="roleIds" rules={[{ required: true, message: "请选择管理员角色" }]}>
          <Select
            placeholder="请选择管理员角色"
            mode="multiple"
            maxTagCount="responsive"
            options={roleList.map(item => ({ label: item.roleName, value: item.id }))}
          />
        </Form.Item>
        <Form.Item label="确认密码" name="confirmPassword" rules={[{ required: true, message: "请输入确认密码" }]}>
          <Input.Password placeholder="请再次输入密码" />
        </Form.Item>
        <StatusFormItem disabled={SUPER_ADMIN_ID === formModalRef.record?.id} />
      </FormModal>
    </React.Fragment>
  );
};

export default SystemAdmin;
