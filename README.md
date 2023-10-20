# Prophet Salary FE

这里是`Prophet-Salary`项目的前端仓库

# 方案

## 基建

脚手架：`Vite`。

使用 `Netlify` 部署至线上，并且可以在合入`main`分支之前预览页面：[网站](https://pph-salary.netlify.app)。子路由无法访问问题详见`_redirect`，
以及`vite.config.ts`中的`viteStaticCopy`依赖配置。

UI 使用`antd` + `unocss`。

使用 `eslint` + `typescript` 约束代码规范，`husky` + `lint-staged`在提交代码之前进行规范检测。

其他工具有：`ahooks`、`lodash`等等。

## 路由
- `/`: 个人主要信息页面，需要登录
- `/login`: 登录页面
- `/employee`：员工管理页面，`payroll`权限可进
- `/purchase`：采购订单页面，`commission`权限可进
- `/timecard`：考勤卡页面，需要`employee`权限可进

## 目录
请看`src`
- `assets` 静态资源
- `components` 一些组件
- `constants` 一些常数
- `hooks` 一些hooks
- `layouts` 基本框架组件
- `models` 一些全局状态
- `requests` 一些网络请求
- `routes` 路由对应的页面组件
- `types` 一些类型
- `utils` 工具类