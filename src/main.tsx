import ReactDOM from "react-dom/client";
import App from "./App";
import { StoreProvider } from "./store";

// vite svg注册脚本
import "virtual:svg-icons-register";

const container = document.getElementById("root");

ReactDOM.createRoot(container!).render(
	<StoreProvider>
		<App />
	</StoreProvider>
);
