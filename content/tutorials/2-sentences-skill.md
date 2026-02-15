# 2 句话让 Claude 学会新技能

> 本教程配套小红书视频，以下是视频中提到的 Prompt 和相关资源。

## 核心 Prompt

只需要 2 句话，就可以让 Claude 学会一个全新的技能（Skill）：

```
请帮我创建一个 Claude Code Skill，功能是 [描述你想要的功能]。
Skill 保存到 ~/.claude/commands/ 目录下。
```

### 示例：创建一个「周报生成器」Skill

```
请帮我创建一个 Claude Code Skill，功能是根据我本周的 git commit 记录自动生成一份中文周报，包含本周完成事项、遇到的问题和下周计划。
Skill 保存到 ~/.claude/commands/ 目录下。
```

### 示例：创建一个「代码审查」Skill

```
请帮我创建一个 Claude Code Skill，功能是审查当前项目的代码质量，检查是否有安全隐患、性能问题和代码规范问题，输出一份审查报告。
Skill 保存到 ~/.claude/commands/ 目录下。
```

## 什么是 Skill？

Skill 是 Claude Code 的自定义命令。创建后可以通过 `/命令名` 直接调用，相当于给 Claude 装了一个"插件"。

## 相关链接

- [Claude Code 官方文档](https://docs.anthropic.com/en/docs/claude-code)
- [Skill 命令语法参考](https://docs.anthropic.com/en/docs/claude-code)
