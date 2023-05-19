import React from 'react';
import styles from './Auth.module.scss';
import { Button, Form, Input, notification } from 'antd';
import { LoginFormDTO } from '@/api/dto/auth.dto';
import * as Api from '@/api';
import { setCookie } from 'nookies';
import { useForm } from 'antd/lib/form/Form';
import { useRouter } from 'next/navigation';

const { Item } = Form;

export const LoginForm: React.FC = () => {
  const [form] = useForm();
  const router = useRouter();

  const onSubmit = async (values: LoginFormDTO) => {
    Api.auth
      .login(values)
      .then((value) => {
        console.log(value);
        const { token } = value.data;
        notification.success({
          message: 'Успешно!',
          description: 'Переходим в приложение...',
          duration: 2,
        });

        setCookie(null, '_token', token, { path: '/' });

        router.push('/dashboard');
      })
      .catch((err) => {
        console.error('LoginForm', err);

        notification.error({
          message: 'Произошла ошибка',
          description: err.response?.data?.message ?? err.message,
          duration: 4,
        });
      });
  };

  return (
    <div className={styles.root}>
      <Form
        form={form}
        onFinish={onSubmit}
        name="basic"
        labelCol={{
          span: 6,
        }}
      >
        <Item
          label="E-mail"
          name="email"
          rules={[
            {
              required: true,
              message: 'Укажите почту',
            },
          ]}
        >
          <Input />
        </Item>

        <Item
          label="Пароль"
          name="password"
          rules={[
            {
              required: true,
              message: 'Укажите пароль',
            },
          ]}
        >
          <Input.Password />
        </Item>

        <Item>
          <Button type="primary" onClick={form.submit}>
            Войти
          </Button>
        </Item>
      </Form>
    </div>
  );
};
