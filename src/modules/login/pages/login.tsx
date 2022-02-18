import { loginApi } from '@api/user.api';
import { ApiResponseStatus } from '@constant/api-status.enum';
import { NotificationType } from '@constant/notification.enum';
import { Login } from '@dto/i-login.dto';
import { popNotification } from '@module/shared/components/notification';
import { IRootState } from '@module/shared/reducers';
import { login } from '@module/shared/reducers/app-reducers';
import { Form, Input, Button } from 'antd';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

interface ILoginPageProps extends StateProps, DispatchProps {}

const LoginPage: React.FC<ILoginPageProps> = (props) => {
  const onFinish = async (values: Login) => {
    console.log('Success:', values);
    const response = await loginApi(values);

    if (response && response.status === ApiResponseStatus.SUCCESS) {
      const loginResponse = response.data;
      props.login(loginResponse);
    } else {
      console.error('Error Response', response);
      popNotification(response.data, NotificationType.error);
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return props.loggedIn ? (
    <Redirect to={'/purchase-requisition-template'} />
  ) : (
    <Form name="basic" labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} initialValues={{ remember: true }} onFinish={onFinish} onFinishFailed={onFinishFailed} autoComplete="off">
      <Form.Item label="User ID" name="userId" rules={[{ required: true, message: 'Please input your user ID!' }]}>
        <Input />
      </Form.Item>

      <Form.Item label="Password" name="password" rules={[{ required: true, message: 'Please input your password!' }]}>
        <Input.Password />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

const mapStateToProps = ({ appState }: IRootState) => ({
  loggedIn: appState.loggedIn,
});
const mapDispatchToProps = {
  login,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
