# 零基础安装 Claude Code 完整教程

> 本教程配套小红书视频，以下是视频中提到的安装步骤和相关链接。

## 安装前准备

你需要准备：

1. **一台电脑**（Mac / Windows / Linux 均可）
2. **VSCode**（代码编辑器）
3. **Node.js**（运行环境）
4. **Anthropic API Key**（Claude 的密钥）

## 第一步：安装 Node.js

前往 Node.js 官网下载安装：

```
https://nodejs.org/
```

安装完成后，打开终端验证：

```bash
node -v
npm -v
```

看到版本号就说明安装成功。

## 第二步：安装 Claude Code

在终端运行：

```bash
npm install -g @anthropic-ai/claude-code
```

## 第三步：配置 API Key

```bash
export ANTHROPIC_API_KEY="你的API密钥"
```

建议将这行添加到你的 shell 配置文件中（`~/.zshrc` 或 `~/.bashrc`），这样每次打开终端都会自动加载。

## 第四步：在 VSCode 中使用

1. 打开 VSCode
2. 打开终端（快捷键 `` Ctrl + ` ``）
3. 输入 `claude` 回车
4. 开始对话！

## 相关链接

- [Node.js 官网](https://nodejs.org/)
- [VSCode 下载](https://code.visualstudio.com/)
- [Anthropic API 控制台](https://console.anthropic.com/)
- [Claude Code 官方文档](https://docs.anthropic.com/en/docs/claude-code)
