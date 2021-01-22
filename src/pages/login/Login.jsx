import React, { Component, createContext } from "react";
import { Redirect, Link } from "react-router-dom";
import { Form, Input, Button } from "antd";
import Message  from "antd/lib/message";
import Icon from "@ant-design/icons";
import "./login.less";
import API from "../../api/api";

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
          code: "",
          codeLength: 4,
          fontSizeMin: 20,
          fontSizeMax: 22,
          backgroundColorMin: 240,
          backgroundColorMax: 250,
          colorMin: 10,
          colorMax: 20,
          lineColorMin: 40,
          lineColorMax: 180,
          contentWidth: 96,
          contentHeight: 38,
        };
      }
    handleSubmit = (values) => {

          let param = {
            username: values.username,
            password: values.password,
          };
          console.log(param);
          API.login(param)
            .then((res) => {
              const { code, msg, data} = res;
              if(code != "200"){
                Message.destroy();
                Message.error("登录失败，用户名或密码错误！");
              }
              else{
                Message.destroy();
                Message.success("登录成功！");
                this.props.history.push('/home');
              }
            //   Message.success(msg);
            //   if (code !== "200") {
            //     Message.error("登录失败，用户名或密码错误！");
            //   } else {
            //     Message.success("登录成功！");
            //     if(data.token&&data.exp){
            //       document.cookie = "token="+ data.token+";expires="+new Date(data.exp).toGMTString();
            //     }
            //     this.props.history.push('/home');
            //   }
            })
            .catch((err) => {
                Message.destroy();
              Message.error(err + "登录失败！请重试！");
            });
      };
    render() {
        return (
            <div className="login">
                <div className="login-wrapper">
                    <div className="login-left">
                        <div className="login-left-container">
                            <h1>系统演示</h1>
                        </div>
                    </div>
                    <div className="login-right">
                        <h2>用户登录</h2>
                        <Form onFinish={this.handleSubmit} className="login-form">
                            <Form.Item
                                rules={[{ required: true, message: "请输入用户名!" }]}
                                name="username"
                            >
                                <Input
                                    // prefix={
                                    //     <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                                    // }
                                    placeholder="用户名"
                                />
                            </Form.Item>
                            <Form.Item
                                rules={[{ required: true, message: "请输入密码!" }]}
                                name="password"
                            >
                                <Input
                                    // prefix={
                                    //     <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                                    // }
                                    type="password"
                                    placeholder="密码"
                                />
                            </Form.Item>
                            <Form.Item>
                                <Button
                                    type="primary"
                                    block
                                    htmlType="submit"
                                    className="login-form-button"
                                // href="/home" // 正式环境去掉这一句
                                >
                                    登录
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
                <div className="footer">——————— XXX公司@2021 —————————</div>
            </div>
        );
    }
}

export default Login;