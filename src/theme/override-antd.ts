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

  /** <---- table style   */
  .ant-table {
    border-top: 1px dashed #e8eaec !important;
  }
  .ant-table .ant-image-mask:hover {
    opacity: 0;
  }
  .ant-table .ant-table-cell {
    font-size: 12px;
    white-space: nowrap;
    overflow-wrap: normal !important;
  }
  .minWidth {
    min-width: 200px;
  }
  .ant-table-pagination * {
    font-size: 14px;
  }
  .ant-table-thead > tr > th {
    background: #fff !important;
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
    /* border-bottom: 1px solid #e8eaec; */
  }
  .ant-table-thead
    > tr
    > th:not(:last-child):not(.ant-table-selection-column):not(.ant-table-row-expand-icon-cell):not([colspan])::before {
    display: none;
  }

  /* table style ----> */

  .ant-form-item {
    .ant-select {
      min-width: 180px;
    }
  }

  .ant-space-vertical {
    width: 100%;
  }

  .ant-typography {
    margin-bottom: 0 !important;
  }

  .ant-menu {
    .ant-menu-item:not(.ant-menu-item-selected):active {
      background-color: unset !important;
    }
  }

  .ant-dropdown-menu {
    padding: 6px !important;
    .ant-dropdown-menu-item-divider {
      margin: 4px -6px !important;
    }
  }

  /**  <---- modal style   */
  .ant-modal.ant-modal-confirm {
    .ant-modal-content {
      padding: 32px 32px 24px;
      .ant-modal-confirm-btns {
        margin-top: 18px;
      }
    }
    .ant-modal-confirm-title {
      color: #17233d;
      font-weight: 500;
    }
    .ant-modal-confirm-content {
      color: #515a6e;
    }
    .ant-btn-text {
      color: #515a6e;
    }
  }
  .ant-modal:not(.ant-modal-confirm) {
    .ant-modal-content {
      border-radius: 0 0 8px 8px;
      padding: 0;
    }
    .ant-modal-header {
      border-bottom: 1px solid #e8eaec;
      padding: 14px 16px;
      background-color: #fafafa;
      margin: 0;
    }
    .ant-modal-body {
      padding: 16px 20px;
    }
  }
  /* .ant-modal-header {
    border-bottom: 1px solid #e8eaec;
    padding: 14px 16px;
    background: #fafafa;
  }
  .ant-modal-close-x {
    height: 51px;
    line-height: 51px;
  }
  .ant-modal-content {
    border-radius: 5px;
  }
  .ant-modal-body {
    padding: 20px;
  }

  .ant-modal-confirm .ant-modal-body {
    padding: 34px 36px 24px;
  } */

  .ant-table-row-expand-icon,
  .ant-table-row-expand-icon-collapsed {
    margin-top: 0 !important;
  }
  .ant-input-clear-icon-has-suffix {
    margin-top: 2px !important;
  }
  /* modal style ----> */

  .ant-pagination {
    .ant-pagination-item {
      border: 1px solid #dcdee2;
      background-color: #fff;
      transition: border 0.2s ease-in-out, color 0.2s ease-in-out;
    }

    .ant-pagination-item-active {
      border-color: #2d8cf0;
    }

    .ant-pagination-item:hover {
      background-color: unset !important;
    }

    .ant-pagination-item:not(.disabled):hover {
      border-color: #2d8cf0;
      * {
        color: #2d8cf0;
      }
    }
  }
`;
