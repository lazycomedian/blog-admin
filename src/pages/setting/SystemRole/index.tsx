import AddButton from "@/components/AddButton";
import BasicSearch from "@/components/BasicSearch";
import FormModal, { useFormModalRef } from "@/components/FormModal";
import StatusFormItem from "@/components/StatusFormItem";
import { CommonStatusEnum, ModalTypeEnum } from "@/enums";
import { useTableRequest } from "@/hooks";
import PageCard from "@/layouts/PageCard";
import PageHeader from "@/layouts/PageHeader";
import { SaveOrUpdateModel } from "@/model/common";
import { SysRoleModel } from "@/model/settings";
import { SysRoleService } from "@/service";
import { tips } from "@/utils";
import { getModalTypeLabel } from "@/utils/common";
import { useMemoizedFn } from "ahooks";
import { Form, Input, Table } from "antd";
import React, { useState } from "react";
import { useColumns } from "./lib";

const SystemRole: React.FC = () => {
  const [submitLoading, setSubmitLoading] = useState(false);

  // 表单弹窗控制器
  const formModalRef = useFormModalRef<Partial<SysRoleModel>>({ status: CommonStatusEnum.AVAILABLE });

  const columns = useColumns({
    reload: () => getList(),
    onEdit: (v, r) => formModalRef.show(ModalTypeEnum.EDIT, r)
  });

  // 获取列表数据
  const { run: getList, tableProps } = useTableRequest(SysRoleService.queryList, {
    defaultPageSize: 15,
    defaultCurrent: 1,
    onError: error => tips.error(error.message)
  });

  /**
   * 添加/编辑保存
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
    <React.Fragment>
      <PageHeader />
      <PageCard>
        <BasicSearch
          placeholder="请输入角色名称"
          onChange={status => getList({ status })}
          onSearch={content => getList({ content })}
        />
        <AddButton onClick={() => formModalRef.show(ModalTypeEnum.ADD)}>添加角色</AddButton>

        <Table rowKey="id" columns={columns} {...tableProps} scroll={{ x: true }} />
      </PageCard>

      {/* modal */}
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
    </React.Fragment>
  );
};

export default SystemRole;
