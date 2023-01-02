import { RightOutlined } from "@ant-design/icons";
import { ExpandableConfig } from "antd/es/table/interface";
import React, { useState } from "react";
import styled from "styled-components";

/**
 * 重写表格的展开样式
 *
 * @param rowKey
 */
export const useTableExpand = (rowKey: string = "id"): ExpandableConfig<any> => {
  const [expandedRowKeys, setExpandedRowKeys] = useState<React.Key[]>([]);

  return {
    expandIcon: ({ record, expanded }) => {
      if (record.children) {
        return React.createElement(ExpandIcon, {
          expanded: expanded ? 1 : 0,
          onClick: () => {
            setExpandedRowKeys(prev => {
              if (!expanded) return prev.includes(record[rowKey]) ? prev : prev.concat([record[rowKey]]);
              else return prev.filter(key => key !== record[rowKey]);
            });
          }
        });
      }
      return React.createElement(PlaceholderGrid);
    },
    indentSize: 13,
    expandedRowKeys
  };
};

const ExpandIcon = styled(RightOutlined)<{ expanded?: 1 | 0 }>`
  transition: all 0.3s;
  margin-right: 8px;
  cursor: pointer;

  ${p => (p.expanded === 1 ? "transform: rotate(90deg)" : "")}
`;

const PlaceholderGrid = styled.div`
  width: 20px;
  height: 100%;
  display: inline-block;
`;
