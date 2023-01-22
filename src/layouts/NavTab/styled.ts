import styled from "styled-components";

export const Wrapper = styled.div`
  height: 44px;
  background-color: #f5f7f9;

  .float_block {
    height: 44px;
    background-color: #f5f7f9;
    transition: all 0.2s ease-in-out;
    z-index: 5;
    position: fixed;
    top: 64px;
    padding: 6px 12px;
    display: flex;
  }

  .nav_tab_main {
    flex-grow: 1;
    overflow: hidden;
    position: relative;
    padding: 0 32px;

    .nav_tab_control {
      width: 32px;
      text-align: center;
      line-height: 32px;
      cursor: pointer;
      position: absolute;
      font-size: 12px;

      &.prev {
        left: 0;
      }
      &.next {
        right: 0;
      }
    }

    .nav_tab_scroll {
      overflow: hidden;
      white-space: nowrap;

      .nav_tab_content {
        padding-left: 0;
        margin: 0;
        float: left;
        list-style: none;
        box-sizing: border-box;
        position: relative;
        transition: transform 0.5s ease-in-out;
      }
    }
  }

  .nav_tab_dropdown {
    width: 32px;
    height: 32px;
    line-height: 30px;
    text-align: center;
    background-color: #fff;
    cursor: pointer;
    border-radius: 2px;
    font-weight: 600;
  }
`;

export const NavTabItem = styled.div`
  height: 32px;
  background: #fff;
  border-radius: 3px;
  border: none;
  margin-right: 6px;
  color: #808695;
  padding: 5px 16px 4px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  display: flex;
  align-items: center;
`;
