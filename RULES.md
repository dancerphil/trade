# 编码规范

1. 当任务复杂时，先规划再编码，每个步骤改动尽量小
2. 组件文件使用 PascalCase 如 `App.tsx`，其他文件使用 camelCase 如 `utils.ts`。
3. 只使用具名导出如 `export const App = () => { ... }`
4. 每个文件控制在 140 行以内，如果超出则拆分代码
5. 出现三次以上的重复代码进行复用
6. 复杂的状态管理使用 region-react，对应文档可以查看 https://raw.githubusercontent.com/regionjs/region/refs/heads/main/docs/Document-zh_CN.md
