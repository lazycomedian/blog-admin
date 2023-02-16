import { SysMenuAPI } from "@/api";
import AddButton from "@/components/AddButton";
import BasicSearch from "@/components/BasicSearch";
import FormModal, { useFormModalRef } from "@/components/FormModal";
import IconPicker from "@/components/IconPicker";
import { useModalRef } from "@/components/ModalHoc";
import StatusFormItem from "@/components/StatusFormItem";
import { TRUE } from "@/constants";
import { CommonStatusEnum, ModalTypeEnum } from "@/enums";
import { usePathname, useTableExpand } from "@/hooks";
import PageCard from "@/layouts/PageCard";
import PageHeader from "@/layouts/PageHeader";
import { SysMenuModel } from "@/model/settings";
import { useStore } from "@/store";
import { tips } from "@/utils";
import { getAntdIconNode, pagesMap } from "@/utils/common";
import { CrownFilled } from "@ant-design/icons";
import { concatString } from "@sentimental/toolkit";
import { useMemoizedFn, useRequest } from "ahooks";
import { Form, Input, InputNumber, Radio, Select, Table, Typography } from "antd";
import React, { useEffect, useMemo, useState } from "react";
import { useColumns } from "./lib";

const SystemMenu: React.FC = () => {
  const { userStore } = useStore();
  const pathname = usePathname();

  const formModalRef = useFormModalRef<SysMenuModel>({
    status: CommonStatusEnum.AVAILABLE,
    visible: TRUE
  });

  const iconPickerRef = useModalRef();

  const [currentIconName, setCurrentIconName] = useState<string>();

  const { run, loading, data = [] } = useRequest(SysMenuAPI.list, { onError: ({ message }) => tips.error(message) });

  const columns = useColumns({
    reload: () => {
      run();
      userStore.updateUserMenu();
    },
    onEdit: (v, record) => {
      record.path = record.path.replace(record.prefixPath || "", "");
      formModalRef.show(ModalTypeEnum.EDIT, record);
    },
    onAdd: (v, record) => {
      formModalRef.show(ModalTypeEnum.ADD, {
        pid: record.id,
        status: CommonStatusEnum.AVAILABLE,
        prefixPath: record.path,
        sort: (record.children?.length || 0) + 1
      });
    }
  });

  const submit = useMemoizedFn(async (result: SysMenuModel, label: string) => {
    try {
      await SysMenuAPI.saveOrUpdate({
        ...result,
        path: (result.prefixPath || "") + (result.path.startsWith("/") ? result.path : "/" + result.path)
      });
      run();
      userStore.updateUserMenu();
      formModalRef.close();
    } catch (error: any) {
      tips.error(`${label}失败${error?.message ? "，" + error?.message : ""}`);
    }
  });

  useEffect(() => {
    if (formModalRef.record?.icon) setCurrentIconName(formModalRef.record.icon);
  }, [formModalRef.record]);

  const sortLimitMax = useMemo(() => {
    const { record, getModalType } = formModalRef;
    if (getModalType() === ModalTypeEnum.ADD) {
      if (record?.prefixPath) {
        const list = userStore.flattenUserMenu.filter(item => item.prefixPath === record.prefixPath);
        return list.length + 1;
      } else {
        // 一级菜单添加
        return userStore.userMenu.length + 1;
      }
    } else {
      if (record?.pid) {
        const parent = userStore.flattenUserMenu.find(item => item.id === record.pid);
        if (typeof parent?.children?.length !== "number") return undefined;
        return parent.children.length + 1;
      } else {
        // 一级目录编辑
        return userStore.userMenu.length + 1;
      }
    }
  }, [formModalRef.record]);

  // 重写表格展开样式
  const tableExpand = useTableExpand();

  return (
    <React.Fragment>
      <PageHeader />
      <PageCard>
        <BasicSearch placeholder="请输入菜单名称" onSearch={run} />
        <AddButton onClick={() => formModalRef.show(ModalTypeEnum.ADD, { sort: data.length + 1 })}>添加菜单</AddButton>
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
      <FormModal ref={formModalRef} title="菜单" doubleColumn initialValues={formModalRef.record} onSubmit={submit}>
        <Form.Item label="菜单名称" name="name" rules={[{ required: true, message: "请输入菜单名称" }]}>
          <Input allowClear placeholder="请输入菜单名称" />
        </Form.Item>
        <Form.Item label="图标" name="icon">
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
              formModalRef.record?.prefixPath && (
                <Typography.Paragraph
                  ellipsis={{ tooltip: { children: formModalRef.record.prefixPath } }}
                  style={{ maxWidth: 150 }}
                >
                  {formModalRef.record.prefixPath}
                </Typography.Paragraph>
              )
            }
            placeholder="请输入页面路由"
          />
        </Form.Item>
        <Form.Item label="组件路径" name="component">
          <Select
            allowClear
            showSearch
            placeholder="目录"
            options={Array.from(pagesMap.keys(), path => ({ label: path, value: path }))}
          />
        </Form.Item>
        <Form.Item label="排序" name="sort" rules={[{ required: true, message: "请输入排序" }]}>
          <InputNumber placeholder="请输入排序" min={1} max={sortLimitMax} />
        </Form.Item>

        <StatusFormItem disabled={pathname === concatString(formModalRef.record?.prefixPath, formModalRef.record?.path)} />
        <Form.Item label="是否显示" name="visible">
          <Radio.Group>
            <Radio value={1}>显示</Radio>
            <Radio value={0}>隐藏</Radio>
          </Radio.Group>
        </Form.Item>
      </FormModal>

      <IconPicker
        ref={iconPickerRef}
        onSelect={iconName => {
          const formInstance = formModalRef.current?.getFormInstance();
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
