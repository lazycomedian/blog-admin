import { css } from "styled-components";

export const overrideAntdCss = css`
  .ant-affix {
    z-index: 1;
  }

  .ant-form-item-label > label {
    color: #515a6e;
    font-size: 12px;
    padding-right: 10px;
  }

  .ant-affix {
    z-index: 2;
  }

  /** <---- card style */
  /* .ant-card-body {
    padding: 12px;
  }

  .ant-card-head {
    padding: 0 16px;
  } */
  /* card style ----> */

  /** <---- table style   */
  .ant-table {
    border-top: 1px dashed #e8eaec !important;
  }
  .ant-table .ant-image-mask:hover {
    opacity: 0;
  }
  .ant-table .ant-table-cell {
    font-size: 12px;
    color: #5a516e;
  }
  .ant-table-pagination * {
    font-size: 14px;
    color: #5a516e;
  }
  .ant-table-thead > tr > th {
    background: #fff;
    color: #5a516e;
    padding: 11px 16px;
    border-bottom: 1px solid #e8eaec;
  }
  .ant-table-ping-right .ant-table-cell-fix-right-first::after,
  .ant-table-ping-right .ant-table-cell-fix-right-last::after {
    box-shadow: inset -10px 0 8px -11px rgb(0 0 0 / 15%);
    /* box-shadow: -2px 0 6px -2px rgba(0, 0, 0, 0.1) !important; */
  }
  .ant-table-ping-left:not(.ant-table-has-fix-left) .ant-table-container::before {
    box-shadow: inset 10px 0 8px -11px rgb(0 0 0 / 15%);
  }
  .ant-table-tbody > tr > td {
    border-bottom: 1px solid #e8eaec;
  }
  .ant-table-thead
    > tr
    > th:not(:last-child):not(.ant-table-selection-column):not(.ant-table-row-expand-icon-cell):not([colspan])::before {
    display: none;
  }
  /* table style ----> */

  /**  <---- modal style   */
  .ant-modal-header {
    border-bottom: 1px solid #e8eaec;
    padding: 14px 16px;
    background: #fafafa;
  }
  .ant-modal-close-x {
    height: 51px;
    line-height: 51px;
  }
  .ant-modal-content {
    /* border-radius: 0px 0px 4px 4px; */
    border-radius: 5px;
  }
  .ant-modal-body {
    padding: 20px;
  }

  .ant-modal-confirm .ant-modal-body {
    padding: 34px 36px 24px;
  }

  /* modal style ----> */
`;
