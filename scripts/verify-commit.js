const chalk = require("chalk");
const msgPath = process.env.HUSKY_GIT_PARAMS;
const msg = require("fs").readFileSync(msgPath, "utf-8").trim();

const commitRE =
  /^(v\d+\.\d+\.\d+(-(alpha|beta|rc.\d+))?)|((revert: )?(feat|fix|docs|style|refactor|perf|test|workflow|ci|chore|types|release)(\(.+\))?!?: .{1,50})/;

if (!commitRE.test(msg)) {
  console.log();
  console.error(
   `${chalk.bgRed.white(" ERROR ")} ${chalk.red('invalid commit message format.')}
 ${chalk.green('feat')}: 新功能、新特性
 ${chalk.green('fix')}: 修改 bug
 ${chalk.green('perf')}: 更改代码，以提高性能
 ${chalk.green('refactor')}: 代码重构（重构，在不影响代码内部行为、功能下的代码修改）
 ${chalk.green('docs')}: 文档修改
 ${chalk.green('style')}: 代码格式修改, 注意不是 css 修改（例如分号修改）
 ${chalk.green('test')}: 测试用例新增、修改
 ${chalk.green('build')}: 影响项目构建或依赖项修改
 ${chalk.green('revert')}: 恢复上一次提交
 ${chalk.green('ci')}: 持续集成相关文件修改
 ${chalk.green('chore')}: 其他修改（不在上述类型中的修改）
 ${chalk.green('release')}: 发布新版本
 ${chalk.green('workflow')}: 工作流相关文件修改
 ${chalk.green('scope')}: commit 影响的范围, 比如: route, component, utils, build...
 ${chalk.green('subject')}: commit 的概述
 ${chalk.green('body')}: commit 具体修改内容, 可以分为多行.
 ${chalk.green('footer')}: 一些备注, 通常是 BREAKING CHANGE 或修复的 bug 的链接.
 `);
  process.exit(1);
}