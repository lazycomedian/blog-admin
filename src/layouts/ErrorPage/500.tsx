import { CommonRouteEnum } from "@/enums";
import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";
import "./index.less";

const ServerError: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Result
      status="500"
      title="500"
      subTitle="Sorry, something went wrong."
      extra={
        <Button type="primary" onClick={() => navigate(CommonRouteEnum.HOME)}>
          Back Home
        </Button>
      }
    />
  );
};

export default ServerError;
