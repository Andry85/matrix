import styles from './Table.module.scss';
import React from 'react';

import { connect } from 'react-redux'
import { addCreator } from '../../redux/actions'


var matrix = (function setMatrix() {
  let array = [];

  for (let i = 0; i < 10; i++) {
    array[i] = [];
    for (let j = 0; j < 10; j++) {

      array[i][j] = Math.floor(Math.random() * 100);

    }
  }

  return array;

})();


console.log(matrix);

const INITIAL_STATE = {
  matrix: matrix,
};


class Table extends React.Component {
  constructor(props) {
    super(props);
    this.state = INITIAL_STATE;
  }

  componentDidMount() {
   


  }

  onUpdateItem = (rowIndex, colIndex) => {

    console.log(rowIndex);
    console.log(colIndex);


    this.setState(state => {
      const matrix = state.matrix.map((item, row) => {
        
        item.map((item, col) => {

          

        })

      });

      return {
        matrix,
      };
    });
  };


  render() {


    return (
      <table className="table table-bordered">
        <tbody>

            {this.state.matrix.map((item, rowIndex) => {
                  return (
                    <tr key={rowIndex}>
                        {item.map((item, colIndex) => {
                            return (
                              <td key={colIndex}>
                                  {item}
                                  <button type="button" onClick={() => this.onUpdateItem(rowIndex, colIndex)}>Add 1</button>
                              </td>
                            )
                          }
                        )}
                    </tr>
                  )
                }
              )}

        </tbody>
      </table>
    );
  }
}
export default Table;

// const mapStateToProps = (state) => {
//   const {rows, cols} = state.addReduser;
//   return {rows, cols}
// }

// const mapDispatchToProps = (dispatch) => {
//   return {
//     addCount: counter => {
//       dispatch(addCreator(counter));
//     }
//   }
// }

// export default  connect(mapStateToProps, mapDispatchToProps)(Table);
