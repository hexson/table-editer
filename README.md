# table-editer
table editer component for React

### 代码地址

[代码地址 -> 传送门](https://github.com/hexson/table-editer)

### 依赖加载

```shell
npm install react-handsontable --save
```

### 使用

复制`./src/TableEditer.js`以及`TableEditer.css`到你的开发(组件)目录下

直接上代码:

```javascript
import React, { Component } from 'react';
import TableEditer from './TableEditer'; // 这里换成你的本地目录结构
import './App.css';

class Create extends Component {
    constructor() {
        super(...arguments);
        this.state = {
            menus: [
                {
                    value: '姓名',
                    required: true
                },
                {
                    value: '结算方式'
                },
                {
                    value: '工资',
                    required: true
                },
                {
                    value: '不导入'
                }
            ],
            matchs: ['不导入', '不导入', '不导入'],
            data: this.data
        };
    }
    data = [
        ['姓名', '结算方式', '工资'],
        [],
        ['张三', '月结', 6000],
        ['李四', '月结', 7500],
        ['王五', '月结', 7000],
        ['张三', '月结', 6000],
        ['李四', '月结', 7000],
        ['王五', '月结', 7000]
    ]
    updateMatchs(matchs) {
        this.setState({
            matchs
        })
    }
    render() {
        return (
            <div>
                <TableEditer root="hot" data={this.data} menus={this.state.menus} matchs={this.state.matchs} updateMatchs={this.updateMatchs.bind(this)} />
                <br />
                <button onClick={() => {this.setState({data: this.data})}}>显示更改后的表格数据</button>
                <div>{JSON.stringify(this.state.data)}</div>
                <br />
                <div>{JSON.stringify(this.state.matchs)}</div>
            </div>
        )
    }
}

export default Create;
```

### 参数说明

`root{String}` 表格id
`data{Array}` 表格内部数据,用户更改数据后,会自动更新source,不建议设置在父组件的state上
`menus{Array[Object...]}` 匹配菜单选择 => `value` 菜单内容 | `required` 是否显示必填,默认false,最后提交做校验
`matchs{Array}` 选择后的匹配结果
`updateMatchs{Function}` 更新用户选择匹配后的数据,返回最新的matchs

### 线上预览

[线上预览地址](https://hexson.github.io/table-editer/build)
