import { Layout } from "antd";
import React from "react";
import Sentences from "./Sentences";
import Header from "./Header";

const { Content, Footer } = Layout;

export default () => (
	<Layout className="layout">
		<Header />
		<Content style={{ padding: "0 50px" }}>
			<div className="site-layout-content" style={{ margin: "100px auto" }}>
				<h1>Sentences</h1>
				<Sentences />
			</div>
		</Content>
		<Footer style={{ textAlign: "center" }}>
			Propcolor.
		</Footer>
	</Layout>
);
