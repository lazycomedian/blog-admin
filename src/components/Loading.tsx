import styled from "@emotion/styled";
import { Spin } from "antd";
import { memo } from "react";

const Loading: React.FC<{ tip: string }> = ({ tip }) => {
	return (
		<Wrapper>
			<Spin tip={tip} size="large" />
		</Wrapper>
	);
};

export default memo(Loading);

const Wrapper = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	z-index: 99;
	width: 100%;
	height: 100%;
	background-color: rgba(255, 255, 255, 0.8);
	display: flex;
	align-items: center;
	justify-content: center;
`;
