import Loading from "@/components/Loading";
import React from "react";
import ReactDOM from "react-dom/client";

/**
 * 控制全屏loading
 *
 */

const LOADING_ID = "admin_full_loading";

let needLoadingRequestCount = 0;

export const showFullScreenLoading = () => {
	if (needLoadingRequestCount === 0) {
		let dom = document.createElement("div");
		dom.setAttribute("id", LOADING_ID);
		document.body.appendChild(dom);
		ReactDOM.createRoot(dom).render(React.createElement(Loading));
	}
	needLoadingRequestCount++;
};

export const tryHideFullScreenLoading = () => {
	if (needLoadingRequestCount <= 0) return;
	needLoadingRequestCount--;
	if (needLoadingRequestCount === 0) {
		const loadingDom = document.getElementById(LOADING_ID);
		loadingDom && document.body.removeChild(loadingDom);
	}
};
