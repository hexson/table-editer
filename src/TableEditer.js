import React, { Component } from 'react';
import Handsontable from 'handsontable';
import HotTable from 'react-handsontable';

import './TableEditer.css';

const { addEvent, removeEvent } = Handsontable.dom;

class TableEditer extends Component {
    constructor(props) {
        super(props);
        let {
            menus,
            matchs
        } = this.props;
        let _menus = [];
        let property = {};
        menus.forEach((v, i) => {
            _menus.push(v.value);
            property[v.value] = v;
        });
        if (!_menus.length) _menus.push('不导入');
        this.state = {
            matchs: matchs || [],
            menus: _menus,
            source: _menus,
            property: property,
            width: 0,
            height: 0,
            dropdownTop: 0,
            dropdownLeft: 0,
            currentColumn: -1,
            display: 'none'
        };
    }
    componentDidMount() {
        addEvent(document.body, 'click', this.dropdownHide.bind(this));
    }

    componentWillUnmount() {
        removeEvent(document.body, 'click', this.dropdownHide.bind(this));
    }

    dropdownShow(width, height, dropdownLeft, dropdownTop, currentColumn) {
        if (this.state.display === 'block' && currentColumn === this.state.currentColumn) {
            this.setState({
                display: 'none'
            })
        } else {
            this.setState({
                width,
                height,
                dropdownTop,
                dropdownLeft,
                currentColumn,
                display: 'block'
            })
        }
    }

    dropdownHide() {
        this.setState({
            display: 'none'
        })
    }

    select(value, e) {
        let { currentColumn } = this.state;
        let { updateMatchs } = this.props;
        let menus = Object.assign([], this.state.source);
        let matchs = Object.assign([], this.state.matchs);
        matchs[currentColumn] = value;
        matchs.forEach((v, i) => {
            let index = menus.indexOf(v);
            if (index >= 0 && v !== menus[menus.length - 1]) {
                menus.splice(index, 1);
            }
        });
        this.setState({
            matchs,
            menus,
            display: 'none'
        });
        updateMatchs && updateMatchs(matchs);
        e.stopPropagation();
    }

    render() {
        let {
            menus,
            width,
            height,
            matchs,
            property,
            currentColumn,
            display,
            dropdownTop,
            dropdownLeft
        } = this.state;
        return (
            <div>
                <HotTable
                    className="table-editer"
                    {...this.props}
                    colHeaders={index => index + 1}
                    rowHeaders={index => index < 2 ? ['标题', '匹配'][index] : (index-1)}
                    readOnlyCellClassName='read-only'
                    cells={
                        (row, col, prop) => {
                            let cellProperties = {};
                            if (row === 0 || row === 1) {
                                cellProperties.readOnly = true;
                            }
                            if (row === 1) {
                                cellProperties.renderer = (instance, td, row, col, prop, value, cellProperties) => {
                                    if (!td.children.length) {
                                        addEvent(td, 'click', (e) => {
                                            let { offsetWidth, offsetTop, offsetLeft, offsetHeight, column } = e.currentTarget;
                                            this.dropdownShow(
                                                offsetWidth - 2,
                                                offsetHeight - 1,
                                                offsetLeft + 1,
                                                offsetTop + offsetHeight + 2,
                                                column
                                            );
                                            e.stopPropagation();
                                        });
                                    }
                                    td.innerHTML = `<span class="droplistTarget">${matchs[col] || '不导入'}<span class="htAutocompleteArrow">▼</span></span>`;
                                    td.className = 'read-only';
                                    td.column = col;
                                    return td;
                                }
                            }
                            return cellProperties;
                        }
                    }
                />
                <ul className="dropdown-cover" style={{width: width, top: dropdownTop, left: dropdownLeft, display: display}}>
                    {
                        menus.map(
                            (v, i) => <li key={i} onClick={this.select.bind(this, v)} style={{ height: height, lineHeight: height + 'px' }}>{v}{property[v].required ? <span className="required"> (必填)</span> : null}</li>
                        )
                    }
                </ul>
            </div>
        )
    }
}

export default TableEditer;