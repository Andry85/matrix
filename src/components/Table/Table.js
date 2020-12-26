import './Table.css';
import React from 'react';

import { connect } from 'react-redux'
import { addCreator } from '../../redux/actions'




let total = 0;


var matrix = (function setMatrix() {
  let array = [];
  
  for (let i = 0; i < 10; i++) {
    array[i] = [];
    for (let j = 0; j < 10; j++) {

      array[i][j] = {
        value: Math.floor(Math.random() * 10000),
        isActive: ''
      };

      total = total + array[i][j].value;

    }
  }

  return array;

})();





const INITIAL_STATE = {
  matrix: matrix,
  isvisible: [],
  total: total
};


class Table extends React.Component {
  constructor(props) {
    super(props);
    this.state = INITIAL_STATE;
  }


  onUpdateItem = (rowIndex, colIndex) => {


    this.setState(state => {

      let totalSum = 0;
  
      let matrix = state.matrix.map((item, i) => {

        item.map((number, j) => {

          totalSum = totalSum + number.value;

          if (number.value === state.matrix[rowIndex][colIndex].value && i === rowIndex && j === colIndex) {
            number.value++;
          }

          return number;

        });

        return item;
      });

      return {
        matrix: matrix,
        total: totalSum
      };
    });

    console.log(this.state);


  };

  onHover = (rowIndex, colIndex) => {

    
    this.setState(state => {
  
      const matrix = state.matrix.map((item, i) => {

        const listItem = item.map((number, j) => {

          let diff = state.matrix[rowIndex][colIndex].value - number.value;

          if (diff < 100 && diff > -100) {
            number.isActive = 'isactive';
            return number;
          } else {
            number.isActive = '';
            return number;
          }
        });

        return listItem;
      });

      return {
        matrix,
      };
    });

    
  }

  onSumRow = (rowIndex) => {
      this.setState(state => {
      
        const isvisible = state.matrix.map((item, i) => {

          if (i === rowIndex) {
            state.isvisible[i] = 'visible';
            return state.isvisible[i];
          } else {
            state.isvisible[i] = 'inVisible';
            return state.isvisible[i];
          }
        

        });

      return {
        isvisible,
      };

    });
    
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
        return item;
      })
      return item;

    });

    console.log('render');



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
                              className={item.isActive} 
                              key={colIndex} 
                              onClick={() => this.onUpdateItem(rowIndex, colIndex)}
                              onMouseOver={() => this.onHover(rowIndex, colIndex)}
                            >
                                {item.value}
                            </td>
                          )
                        }
                      )}              
                      <td  
                        className={this.state.isvisible[rowIndex]} 
                        onMouseOver={() => this.onSumRow(rowIndex)}
                      >
                          <strong>{summa}</strong>
                          <span>{parseInt(summa/this.state.total * 100)} %</span>
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
