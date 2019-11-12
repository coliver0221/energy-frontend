import React, { useState, useEffect } from 'react';
import Router from 'next/router';
import styled from 'styled-components';

const Block = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Form = styled.form`
  width: 476px;
  height: 588px;
  padding: 58px 61px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  border-radius: 10px;
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
  background-color: #ffffff;
`;
const Button = styled.button`
  width: 100%;
  height: 52px;
  font-family: Roboto;
  font-size: 20px;
  color: #fff;
  background-color: #39625e;
  border-radius: 5px;
  padding: 12px;
`;
const DivCenter = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: baseline;
  flex-direction: column;
`;
const DivList = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const SpanSelect = styled.span<{ isClick: boolean }>`
  font-family: Roboto;
  font-size: 15px;
  color: #707070;
  &::before {
    content: '';
    width: 16px;
    height: 16px;
    border: solid 1px #707070;
    background-color: ${props => (props.isClick ? '#39625e' : '#fff')};
    display: inline-block;
    vertical-align: -10%;
    margin-right: 5px;
  }
`;

const Login: React.FC = () => {
  const [isRemem, setRemem] = useState(false);
  const [loginInfo, setLoginInfo] = useState({ account: '', password: '' });
  const [userData, setUserData] = useState<any>({ user_id: '', bearer: '' });

  useEffect(() => {
    // pre-check
    setUserData({
      user_id: localStorage.getItem('BEMS_user_id') || '',
      bearer: localStorage.getItem('BEMS_bearer') || '',
    });
    if (userData.user_id !== '' && userData.bearer !== '') {
      Router.push('/');
    }
  }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const response = await fetch('http://140.116.247.120:5000/login', {
      method: 'POST',
      body: JSON.stringify(loginInfo),
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
    })
      .then(resp => resp.json())
      .catch();
    if (!!response.id && !!response.bearer) {
      localStorage.setItem('BEMS_user_id', response.id);
      localStorage.setItem('BEMS_bearer', response.bearer);
      Router.push('/');
    }
  };

  const handleAccount = (event: React.FormEvent<HTMLInputElement>) =>
    setLoginInfo({
      ...loginInfo,
      account: event.currentTarget.value,
    });
  const handlePassword = (event: React.FormEvent<HTMLInputElement>) =>
    setLoginInfo({
      ...loginInfo,
      password: event.currentTarget.value,
    });

  return (
    <React.Fragment>
      <Block
        style={{
          backgroundImage: 'url(/static/login/login_pic.png)',
          float: 'left',
        }}
      />
      <Block
        style={{
          float: 'right',
          backgroundColor: '#f1f2f1',
        }}
      >
        <Form onSubmit={handleSubmit}>
          <img src="/static/login/login_logo.png" />
          <DivCenter>
            <span>帳號</span>
            <input type="text" id="account" onChange={handleAccount} />
            <span>密碼</span>
            <input type="password" id="password" onChange={handlePassword} />
            <DivList onClick={() => setRemem(!isRemem)}>
              <SpanSelect isClick={isRemem}>記住我</SpanSelect>
              <span className="list">忘記密碼？</span>
            </DivList>
          </DivCenter>
          <Button type="submit">登入</Button>
        </Form>
        <style jsx>{`
          input {
            border-top: 0px;
            border-left: 0px;
            border-right: 0px;
            border-bottom: 1px solid #707070;
            width: 100%;
            margin-top: 10px;
            margin-bottom: 10px;
            font-family: Roboto;
            font-size: 20px;
            color: #707070;
          }
          input:placeholder {
            font-family: Roboto;
            font-size: 20px;
            color: #707070;
          }
          span {
            font-family: Roboto;
            font-size: 20px;
            color: #707070;
            margin-top: 10px;
            margin-bottom: 10px;
            font-family: Roboto;
          }
          .list {
            font-family: Roboto;
            font-size: 15px;
            color: #707070;
          }
        `}</style>
      </Block>
    </React.Fragment>
  );
};

export default Login;
