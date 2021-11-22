import { useQuery } from "@utils/api/query-params-hook";
import { Form, Input, Button, Checkbox } from "antd";
import { Redirect } from "react-router";

const LoginPage: React.FC = () => {
  const onFinish = (values: any) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const queryParams = useQuery();

  /**
   * When performing request on page other than root path, server will redirect to root with the rest of the paths as query param (page-refresh), to avoid 404 error
   * @example
   * - While navigate to /purchase-requisition-template, server will return /?page-refresh=purchase-requisition-template
   * - Then the following code will perform the redirect
   */
  if (queryParams.get("page-refresh")) {
    const redirectUrl: string = `/page-refresh/${queryParams.get("page-refresh")}` || "/";
    return (
      <Redirect to={redirectUrl}/>
    )
  } else {
    return (
      <Form name="basic" labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} initialValues={{ remember: true }} onFinish={onFinish} onFinishFailed={onFinishFailed} autoComplete="off">
        <Form.Item label="Username" name="username" rules={[{ required: true, message: "Please input your username!" }]}>
          <Input />
        </Form.Item>
  
        <Form.Item label="Password" name="password" rules={[{ required: true, message: "Please input your password!" }]}>
          <Input.Password />
        </Form.Item>
  
        <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>
  
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    );
  }

};

export default LoginPage;
