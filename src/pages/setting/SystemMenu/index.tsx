import AddButton from "@/components/AddButton";
import BasicSearch from "@/components/BasicSearch";
import FormModal, { useFormModalRef } from "@/components/FormModal";
import IconPicker from "@/components/IconPicker";
import StatusFormItem from "@/components/StatusFormItem";
import { CommonStatusEnum, ModalTypeEnum } from "@/enums";
import { useTableExpand } from "@/hooks";
import { useModalRef } from "@/hooks/modal";
import PageCard from "@/layouts/PageCard";
import PageHeader from "@/layouts/PageHeader";
import { SaveOrUpdateModel } from "@/model/common";
import { SysMenuModel } from "@/model/settings";
import { SysMenuService } from "@/service";
import { useStore } from "@/store";
import { tips } from "@/utils";
import { getAntdIconNode, getModalTypeLabel } from "@/utils/common";
import { CrownFilled } from "@ant-design/icons";
import { concatString } from "@sentimental/toolkit";
import { useMemoizedFn, useRequest } from "ahooks";
import { Form, Input, InputNumber, Table, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { useColumns } from "./lib";

const SystemMenu: React.FC = props => {
  const { userStore } = useStore();

  const [submitLoading, setSubmitLoading] = useState(false);

  const [currentIconName, setCurrentIconName] = useState<string>();

  // 表单弹窗控制器
  const formModalRef = useFormModalRef<Partial<SysMenuModel>>({ status: CommonStatusEnum.AVAILABLE });

  // 图标选择控制器
  const iconPickerRef = useModalRef();

  const { run, loading, data } = useRequest(SysMenuService.findAll, {
    onError: error => tips.error(error.message)
  });

  const columns = useColumns({
    reload: () => {
      run();
      userStore.updateUserMenu();
    },
    onEdit: (v, record) => formModalRef.show(ModalTypeEnum.EDIT, record),
    onAdd: (v, record) => {
      formModalRef.show(ModalTypeEnum.ADD, {
        pid: record.id,
        status: CommonStatusEnum.AVAILABLE,
        prefixPath: concatString(record.prefixPath, record.path)
      });
    }
  });

  /**
   * 添加/编辑保存
   * @param result 表单内容
   */
  const submit = useMemoizedFn(async (result: SaveOrUpdateModel<SysMenuModel>) => {
    setSubmitLoading(true);
    const modalType = formModalRef.getModalType();
    const prefixTips = getModalTypeLabel(modalType);
    if (modalType === ModalTypeEnum.EDIT) result.id = formModalRef.currentRecord?.id;

    try {
      await SysMenuService.saveOrUpdate(result);
      tips.success(prefixTips + "成功");
      run();
      userStore.updateUserMenu();
      formModalRef.close();
    } catch (error) {
      tips.error(prefixTips + "失败");
    } finally {
      setSubmitLoading(false);
    }
  });

  useEffect(() => {
    setCurrentIconName(formModalRef.currentRecord?.icon);
  }, [formModalRef.currentRecord]);

  // 重写表格展开样式
  const tableExpand = useTableExpand();

  return (
    <React.Fragment>
      <PageHeader />
      <PageCard>
        <BasicSearch placeholder="请输入菜单名称" onChange={status => run({ status })} onSearch={content => run({ content })} />
        <AddButton onClick={() => formModalRef.show()}>添加菜单</AddButton>

        <Table
          rowKey="id"
          columns={columns}
          loading={loading}
          dataSource={data}
          pagination={false}
          expandable={tableExpand}
          scroll={{ x: true }}
        />
      </PageCard>

      {/* modal */}
      <FormModal
        ref={formModalRef}
        title="菜单"
        loading={submitLoading}
        initialValues={formModalRef.currentRecord}
        onSubmit={submit}
      >
        <Form.Item label="菜单名称" name="name" rules={[{ required: true, message: "请输入菜单名称" }]}>
          <Input allowClear placeholder="请输入菜单名称" />
        </Form.Item>
        <Form.Item
          label="图标"
          name="icon"
          // rules={[
          //   { required: true, message: "请输入或选择图标名称" },
          //   {
          //     message: "请输入或选择正确的图标",
          //     validator: async (rule, value) => {
          //       if (!value) return Promise.resolve();
          //       if (!getAntdIconNode(currentIconName)) return Promise.reject();
          //     }
          //   }
          // ]}
        >
          <Input
            placeholder="请输入图标名称，点击右侧可选择"
            prefix={getAntdIconNode(currentIconName)}
            allowClear
            onChange={e => setCurrentIconName(e.target.value)}
            suffix={<CrownFilled className="cursor-pointer" onClick={() => iconPickerRef.current?.show()} />}
          />
        </Form.Item>
        <Form.Item label="页面路由" name="path" rules={[{ required: true, message: "请输入页面路由" }]}>
          <Input
            allowClear
            addonBefore={
              formModalRef.currentRecord?.prefixPath && (
                <Typography.Paragraph
                  ellipsis={{ tooltip: { children: formModalRef.currentRecord.prefixPath } }}
                  style={{ maxWidth: 150 }}
                >
                  {formModalRef.currentRecord.prefixPath}
                </Typography.Paragraph>
              )
            }
            placeholder="请输入页面路由"
          />
        </Form.Item>
        <Form.Item label="组件路径" name="component">
          <Input allowClear placeholder="请输入组件路径" />
        </Form.Item>
        <Form.Item label="排序" name="sort" rules={[{ required: true, message: "请输入排序" }]}>
          <InputNumber placeholder="请输入排序" min={1} />
        </Form.Item>
        <StatusFormItem />
      </FormModal>

      <IconPicker
        ref={iconPickerRef}
        onSelect={iconName => {
          const formInstance = formModalRef.getFormInstance();
          formInstance?.setFieldValue("icon", iconName);
          formInstance?.validateFields(["icon"]);
          setCurrentIconName(iconName);
          iconPickerRef.current?.close();
        }}
      />
    </React.Fragment>
  );
};

export default SystemMenu;