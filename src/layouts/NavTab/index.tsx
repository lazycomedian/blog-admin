import Iconfont from "@/components/Iconfont";
import { CommonRouteEnum, StorageKeyEnum } from "@/enums";
import { useRouteMenuObject } from "@/hooks";
import { UserMenuModel } from "@/model/settings";
import { useStore } from "@/store";
import { ArrowLeftOutlined, ArrowRightOutlined, CloseCircleFilled, CloseOutlined } from "@ant-design/icons";
import { useLocalStorage } from "@sentimental/hooks";
import { isNumber } from "@sentimental/toolkit";
import { useEventListener, useMemoizedFn, useScroll, useSize } from "ahooks";
import { Dropdown, MenuProps } from "antd";
import { observer } from "mobx-react";
import React, { memo, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import NavTabItem from "./NavTabItem";

interface NavTabProps {
  left?: number;
}

const NavTab: React.FC<NavTabProps> = ({ left = 0 }) => {
  const { userStore } = useStore();
  const navigate = useNavigate();

  const scrollRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const activeTabRef = useRef<HTMLDivElement>(null);
  const scrollSize = useSize(scrollRef);
  const contentSize = useSize(contentRef);

  const currentRouteMenu = useRouteMenuObject();

  const [data, setData] = useLocalStorage<UserMenuModel[]>(StorageKeyEnum.NAV_TAB, {
    mode: import.meta.env.MODE,
    defaultValue: []
  });

  // 当前滚动距离左侧的距离
  const [scrollDistance, setScrollDistance] = useState(0);

  // 允许滚动的距离，大于0时允许滚动
  const maxDistance = useMemo(() => {
    const contentWidth = contentSize?.width;
    const scrollWidth = scrollSize?.width;
    return isNumber(contentWidth) && isNumber(scrollWidth) ? contentWidth - scrollWidth : 0;
  }, [scrollSize?.width, contentSize?.width]);

  useEffect(() => {
    if (currentRouteMenu && !data.some(item => item.id === currentRouteMenu.id)) {
      // 根据路由变化添加tab
      currentRouteMenu && setData(prev => prev.concat([currentRouteMenu]));
    }
  }, [currentRouteMenu]);

  useEffect(() => {
    if (data.some(item => userStore.flattenUserMenu.some(f => f.id === item.id && f.path !== item.path))) {
      setData(prev => {
        const result = [...prev];
        result.forEach(item => {
          const latestPath = userStore.flattenUserMenu.find(f => f.id === item.id)?.path;
          if (latestPath) item.path = latestPath;
        });
        return result;
      });
    }
  }, [userStore.flattenUserMenu]);

  useEffect(() => {
    // 确保tab中至少存在一个主页标签
    if (data.length === 0) {
      const homePage = userStore.userMenu.find(item => item.path === CommonRouteEnum.HOME);
      if (homePage) {
        navigate(CommonRouteEnum.HOME);
        setData([homePage]);
      }
    }
  }, [data]);

  // 完整展示当前选中tab标签
  useEffect(() => {
    const { offsetLeft, offsetWidth } = activeTabRef.current || {};
    const scrollWidth = scrollRef.current?.offsetWidth;

    if (isNumber(offsetLeft) && isNumber(offsetWidth) && typeof scrollWidth === "number") {
      const willPrevMove = scrollDistance - offsetLeft;

      if (willPrevMove > 0) {
        // 向左滚动滚动
        setScrollDistance(prev => (prev - willPrevMove < 0 ? 0 : prev - willPrevMove));
      } else {
        if (scrollDistance > maxDistance) {
          // 超过最大滚动距离时位置跟随最大滚动距离变化
          setScrollDistance(maxDistance);
        } else {
          // 计算当前点击元素存在视图之外的宽度
          const willNextMove = offsetLeft - scrollDistance + offsetWidth - scrollWidth;
          // 向右滚动滚动
          willNextMove > 0 && setScrollDistance(prev => prev + willNextMove);
        }
      }
    }
  }, [currentRouteMenu, data, scrollSize?.width]);

  useEffect(() => {
    if (maxDistance <= 0) setScrollDistance(0);
  }, [maxDistance]);

  useEventListener(
    "wheel",
    (e: WheelEvent) => {
      e.preventDefault();
      if (e.deltaY !== 0 || e.deltaX !== 0) handleScroll(e.deltaY > 0 || e.deltaX > 0 ? "next" : "prev");
    },
    { target: scrollRef }
  );

  /**
   * 处理tab标签的整页滚动
   * @param type
   */
  const handleScroll = useMemoizedFn((type: "prev" | "next") => {
    const perMove = typeof scrollSize?.width === "number" ? scrollSize.width : 0;
    switch (type) {
      case "prev":
        if (scrollDistance !== 0) setScrollDistance(prev => (prev - perMove <= 0 ? 0 : prev - perMove));
        break;
      case "next":
        if (scrollDistance !== maxDistance)
          setScrollDistance(prev => (prev + perMove >= maxDistance ? maxDistance : prev + perMove));
        break;
    }
  });

  const pageScroll = useScroll(document);

  const containerTop = useMemo<number>(() => {
    const top = 64 - (pageScroll?.top || 0);
    return top > 0 ? top : 0;
  }, [pageScroll?.top]);

  const dropdownMenu = useMemo<MenuProps>(() => {
    return {
      onClick: ({ key }) => {
        if (data.length === 1 && data[0].path === CommonRouteEnum.HOME) return;
        const index = data.findIndex(item => item.id === currentRouteMenu?.id);
        if (index === -1) return;
        switch (key) {
          case "left":
            setData(prev => prev.slice(index));
            break;
          case "right":
            setData(prev => prev.slice(0, index + 1));
            break;
          case "other":
            setData([data[index]]);
            break;
          case "all":
            setData([]);
            break;
        }
      },
      items: [
        { key: "left", label: "关闭左侧", icon: <ArrowLeftOutlined /> },
        { key: "right", label: "关闭右侧", icon: <ArrowRightOutlined /> },
        { key: "other", label: "关闭其他", icon: <CloseOutlined /> },
        { key: "all", label: "关闭全部", icon: <CloseCircleFilled /> }
      ]
    };
  }, [data, currentRouteMenu]);

  return (
    <Wrapper showControl={maxDistance > 0}>
      <div className="nav_tab_container" style={{ top: containerTop, left, width: `calc(100% - ${left}px)` }}>
        <div className="nav_tab_main">
          {/* 滚动控制器 */}
          <Iconfont className="nav_tab_control prev" type="sentimental-down" rotate={90} onClick={() => handleScroll("prev")} />
          <Iconfont className="nav_tab_control next" type="sentimental-down" rotate={270} onClick={() => handleScroll("next")} />

          <div className="nav_tab_scroll" ref={scrollRef}>
            <div className="nav_tab_content" ref={contentRef} style={{ transform: `translateX(-${scrollDistance}px)` }}>
              {data.map((item, index) => {
                const isActive = currentRouteMenu?.id === item.id;
                return (
                  <NavTabItem
                    key={index}
                    ref={activeTabRef}
                    active={isActive}
                    showClose={!(data.length === 1 && item.path === CommonRouteEnum.HOME)}
                    onClick={() => navigate(item.path)}
                    onClose={() => {
                      if (isActive) {
                        const nextPath = data[index + 1]?.path;
                        if (nextPath) navigate(nextPath);
                        else if (index - 1 >= 0) {
                          const prevPath = data[index - 1]?.path;
                          prevPath && navigate(prevPath);
                        }
                      }
                      setData(prev => prev.filter(p => p.id !== item.id));
                    }}
                  >
                    {item.name}
                  </NavTabItem>
                );
              })}
            </div>
          </div>
        </div>

        {/* 下拉操作 */}
        <Dropdown menu={dropdownMenu} trigger={["click"]}>
          <Iconfont className="nav_tab_dropdown" type="sentimental-down" fontSize={12} />
        </Dropdown>
      </div>
    </Wrapper>
  );
};

export default memo(observer(NavTab));

const Wrapper = styled.div<{ showControl: boolean }>`
  height: 44px;
  background-color: #f5f7f9;

  .nav_tab_container {
    height: 44px;
    background-color: #f5f7f9;
    /* transition: all 0.2s ease-in-out; */
    transition: all 0.2s ease-out;
    z-index: 5;
    position: fixed;
    padding: 6px 12px;
    display: flex;
  }

  .nav_tab_main {
    flex-grow: 1;
    overflow: hidden;
    position: relative;
    padding: ${p => (p.showControl ? "0 32px" : "unset")};

    .nav_tab_control {
      width: 32px;
      text-align: center;
      color: #515a6e;
      line-height: 32px;
      cursor: pointer;
      position: absolute;
      font-size: 12px;
      display: ${p => (p.showControl ? "" : "none")};

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
        margin: 0;
        position: relative;
        transition: transform 0.5s ease-in-out;
        float: left;
      }
    }
  }

  .nav_tab_dropdown {
    flex-shrink: 0;
    color: #515a6e;
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
