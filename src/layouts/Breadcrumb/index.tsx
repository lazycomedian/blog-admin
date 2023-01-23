import { usePathname } from "@/hooks";
import { useStore } from "@/store";
import { getAntdIconNode, getOpenKeysByPath } from "@/utils/common";
import classNames from "classnames";
import React, { memo, useMemo } from "react";
import styled from "styled-components";

interface BreadcrumbProps {
  className?: string;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ className }) => {
  const { userStore } = useStore();
  const pathname = usePathname();

  const openMenus = useMemo(() => {
    return [...getOpenKeysByPath(pathname), pathname]
      .map(key => userStore.flattenUserMenu.find(item => item.path === key)!)
      .filter(Boolean);
  }, [pathname, userStore.flattenUserMenu]);

  return (
    <Wrapper className={className}>
      {openMenus.map(item => (
        <React.Fragment key={item.id}>
          <div className="breadcrumb-separator">/</div>
          {item.icon && <div className="breadcrumb-icon">{getAntdIconNode(item.icon)}</div>}
          <div className={classNames("breadcrumb-item", { "breadcrumb-item-active": item.path === pathname })}>{item.name}</div>
        </React.Fragment>
      ))}
    </Wrapper>
  );
};

export default memo(Breadcrumb);

const Wrapper = styled.div`
  font-size: 14px;
  white-space: nowrap;
  display: flex;
  flex-wrap: nowrap;
  align-items: center;

  .breadcrumb-item {
    margin-left: 6px;
    color: #999;
    font-weight: 400;

    &-active {
      color: #515a6e;
    }
  }

  .breadcrumb-icon {
    display: inline-block;
    width: 24px;
    height: 24px;
    line-height: 24px;
    text-align: center;
    font-size: 14px;
    color: #999;
  }

  .breadcrumb-separator {
    margin: 0 8px;
    color: #dcdee2;
    font-size: 14px;
  }
`;
