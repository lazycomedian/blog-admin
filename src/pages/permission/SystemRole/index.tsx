import { SysRoleAPI } from "@/api";
import AddButton from "@/components/AddButton";
import BasicSearch from "@/components/BasicSearch";
import FormModal, { useFormModalRef } from "@/components/FormModal";
import StatusFormItem from "@/components/StatusFormItem";
import { CommonStatusEnum, ModalTypeEnum } from "@/enums";
import { useTableRequest } from "@/hooks";
import PageCard from "@/layouts/PageCard";
import PageHeader from "@/layouts/PageHeader";
import { SysRoleModel } from "@/model/settings";
import { tips } from "@/utils";
import { useMemoizedFn } from "ahooks";
import { Form, Input, Table } from "antd";
import React from "react";
import MenuTree from "./components/MenuTree";
import { useColumns } from "./lib";

const SystemRole: React.FC = () => {
  const formModalRef = useFormModalRef<SysRoleModel>({
    status: CommonStatusEnum.AVAILABLE
  });

  const columns = useColumns({
    reload: () => getList(),
    onEdit: (v, record) => {
      record.menuIds = record.menuList.map(item => item.id);
      formModalRef.show(ModalTypeEnum.EDIT, record);
    }
  });

  const { run: getList, tableProps } = useTableRequest(SysRoleAPI.queryList, {
    defaultPageSize: 15,
    defaultCurrent: 1,
    onError: error => tips.error(error.message)
  });

  const submit = useMemoizedFn(async (result: SysRoleModel) => {
    await SysRoleAPI.saveOrUpdate(result);
    getList();
    formModalRef.close();
  });

  return (
    <React.Fragment>
      <PageHeader />
      <PageCard>
        <BasicSearch placeholder="请输入角色名称" onSearch={getList} />
        <AddButton onClick={() => formModalRef.show(ModalTypeEnum.ADD)}>添加角色</AddButton>

        <Table rowKey="id" columns={columns} {...tableProps} scroll={{ x: true }} />
      </PageCard>

      {/* modal */}
      <FormModal ref={formModalRef} title="角色" width={600} initialValues={formModalRef.record} onSubmit={submit}>
        <Form.Item label="角色名称" name="roleName" rules={[{ required: true, message: "请输入角色名称" }]}>
          <Input placeholder="请输入角色名称" />
        </Form.Item>
        <StatusFormItem />
        <Form.Item name="menuIds" label="菜单权限">
          <MenuTree />
        </Form.Item>
      </FormModal>
    </React.Fragment>
  );
};

export default SystemRole;
