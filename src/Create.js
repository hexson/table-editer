import React, { Component } from 'react';
import TableEditer from './TableEditer';
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
