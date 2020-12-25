import styles from './Table.module.scss';
import React from 'react';

import { connect } from 'react-redux'
import { addCreator } from '../../redux/actions'


var matrix = (function setMatrix() {
  let array = [];

  for (let i = 0; i < 10; i++) {
    array[i] = [];
    for (let j = 0; j < 10; j++) {

      array[i][j] = {
        value: Math.floor(Math.random() * 1000),
        isActive: ''
      };

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

    this.setState(state => {
  
      const matrix = state.matrix.map((item, i) => {

        const listItem = item.map((number, j) => {

          if (number.value === state.matrix[rowIndex][colIndex].value && i === rowIndex && j === colIndex) {
            number.value = number.value + 1;
            return number;
          } else {
            return number;
          }
        });

        return listItem;
      });

      return {
        matrix,
      };
    });

  };

  onHover = (rowIndex, colIndex) => {
    
  }


  render() {

    let avrArr = [];
    this.state.matrix.map((item) => {
      item.map((item, colIndex) => {
        if (avrArr[colIndex] === undefined) {
          avrArr[colIndex] = item.value;
        } else {
          avrArr[colIndex] = avrArr[colIndex] + item.value;
        }
      })

    })


    return (
      <table className="table table-bordered">
        <tbody>

            {this.state.matrix.map((item, rowIndex) => {
                let summa = 0;
                return (
                  <tr key={rowIndex}>
                      {item.map((item, colIndex) => {
                          
                          summa = summa + item.value;
                          
                          return (
                            <td 
                            key={colIndex} 
                            onClick={() => this.onUpdateItem(rowIndex, colIndex)}
                            onMouseOver={() => this.onHover(rowIndex, colIndex)}
                            >
                                {item.value}
                            </td>
                          )
                        }
                      )}              
                      <td>
                          {summa}
                      </td>  
                  </tr>
                )
              }
            )}

            <tr>

              {avrArr.map((item, i) => {       
                let avrItem = item/avrArr.length; 
                return (
                  <td key={i}>
                      {avrItem}
                  </td>
                )
                }
              )}
            </tr>

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
