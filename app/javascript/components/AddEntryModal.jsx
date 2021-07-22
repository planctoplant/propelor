import { Button, Form, Input, Modal, Select } from "antd";
import React from "react";

const { Option } = Select;

class AddEntityModal extends React.Component {
	formRef = React.createRef();
	state = {
		visible: false,
	};

	get_token = () => {
		return document.querySelector('[name="csrf-token"]').content;
	};

	onFinish = (values) => {
		const url = "api/v1/entities/";
		fetch(url, {
			method: "post",
			headers: {
				"Content-Type": "application/json",
				'X-CSRF-Token': this.get_token()
			},
			body: JSON.stringify(values),
		})
			.then((data) => {
				if (data.ok) {
					this.handleCancel();

					return data.json();
				}
				throw new Error("Network error.");
			})
			.then(() => {
				this.props.reloadBeers();
			})
			.catch((err) => console.error("Error: Creating entity " + err));
	};

	showModal = () => {
		this.setState({
			visible: true,
		});
	};

	handleCancel = () => {
		this.setState({
			visible: false,
		});
	};

	render() {
		return (
			<>
				<Button type="primary" onClick={this.showModal}>
					Create New +
				</Button>

				<Modal
					title="Add New Entity ..."
					visible={this.state.visible}
					onCancel={this.handleCancel}
					footer={null}
				>
					<Form ref={this.formRef} layout="vertical" onFinish={this.onFinish}>
						<Form.Item
							name="text"
							label="Text"
							rules={[
								{ required: true, message: "Please input the entity text" },
							]}
						>
							<Input placeholder="Input the entity text" />
						</Form.Item>

						<Form.Item
							name="ktype"
							label="Type"
							rules={[
								{ required: true, message: "Please input the entity type" },
							]}
						>
							<Input placeholder="Input the entity type" />
						</Form.Item>

						<Form.Item>
							<Button type="primary" htmlType="submit">
								Submit
							</Button>
						</Form.Item>
					</Form>
				</Modal>
			</>
		);
	}
}

export default AddEntityModal;
