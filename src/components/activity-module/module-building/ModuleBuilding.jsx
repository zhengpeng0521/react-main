import React, {PropTypes} from 'react';
import styles from './ModuleBuilding.less';
import {Button} from 'antd';
import ColorSelect from '../../common/color-select/ColorSelect';

/*
 * 模板编辑页面-H5显示框架
 */
class ModuleBuilding extends React.Component {
    constructor(props) {
        super(props);

        // 设置 initial state
        this.state = {
           gridShow: false,//是否显示网格
        };

        this.changeGridShow = this.changeGridShow.bind(this);
    }

    changeGridShow() {
        this.setState({
            gridShow: !this.state.gridShow
        });
    }

    render() {

        let {children,onClick,mobileBorderColor,changeMobileBorderColor,} = this.props;
        let {gridShow} = this.state;

        let h5_mobile_show_style = {};
    //    h5_mobile_show_style.background = 'url(http://img.ishanshan.com/gimg/img/87419ac481cfba1eece4c3729ac714f2) no-repeat';
    //    h5_mobile_show_style.backgroundSize = 'cover';

        let row_grid_item_list = [];
        for(let i = 0; i < 63; i++) {
            row_grid_item_list.push(
                <div className={styles.row_grid_item} key={'row_grid_item_' + i}></div>
            );
        }

        let col_grid_item_list = [];
        for(let i = 0; i < 37; i++) {
            col_grid_item_list.push(
                <div className={styles.col_grid_item} key={'col_grid_item_' + i} style={{left: (i*10) + 'px'}}></div>
            );
        }

        return (
            <div className={styles.h5_building_cont}>
                <div className={styles.h5_mobile_show}
                    style={h5_mobile_show_style}
                >
                   <div className={styles.module_building_bar}>
                      <Button className={styles.module_building_btn} type={gridShow ? 'primary': 'ghost'} onClick={this.changeGridShow}>网格</Button>

                       <ColorSelect
                           width='50px' height='20px'
                           value={mobileBorderColor}
                           onChange={changeMobileBorderColor}/>
                  </div>
                    <div className={styles.h5_mobile_show_content} onClick={onClick} style={{borderColor: mobileBorderColor}}>
                        {children}
                    </div>

                  {!!gridShow &&
                        <div className={styles.grid_content}>
                            <div className={styles.grid_cont}>
                               {row_grid_item_list}
                           </div>
                           <div className={styles.grid_cont}>
                               {col_grid_item_list}
                           </div>
                        </div>
                    }

                    <div className={styles.header_msg_cont}>
                        <div className={styles.header_msg_item}>
                            选中元素后，通过方向键↑↓←→进行微调元素位置
                        </div>
                        <div className={styles.header_msg_item}>
                            选中元素后，通过 WSAD 键进行调整元素位置
                        </div>
                    </div>

                </div>
            </div>
        );
    }
}

export default ModuleBuilding;
