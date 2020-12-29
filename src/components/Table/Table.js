import './Table.css';
import React from 'react';

import { connect } from 'react-redux'
import { addCreator } from '../../redux/actions'

let total = 0;

var matrix = (function setMatrix() {
  let array = [];
  for (let i = 0; i < 5; i++) {
    array[i] = [];
    for (let j = 0; j < 5; j++) {
      array[i][j] = {
        value: Math.floor(Math.random() * 1000),
        isActive: ''
      };
      total = total + array[i][j].value;
    }
  }
  return array;
})();


function updateTotal(state) {
  let totalSum = 0;
    state.map((rows, i) => {
      rows.map((cols, j) => {
        totalSum = totalSum + cols.value;
        return cols;
      });
      return rows;
    });
  return totalSum;
}


const INITIAL_STATE = {
  matrix,
  isvisible: [],
  total
};

class Table extends React.Component {
  constructor(props) {
    super(props);
    this.state = INITIAL_STATE;
  }

  onUpdateItem = (rowIndex, colIndex) => {
   
    this.setState((prevState) => { 

      let totalSum = 0;
      let newMatrix = prevState.matrix.map((items, i) => {
        
        let itemsList = items.map((item, j) => {
            totalSum = totalSum + item.value;
            if (item.value === prevState.matrix[rowIndex][colIndex].value && i === rowIndex && j === colIndex) {
 
              return {
                  ...item,
                  value: item.value + 1
                  
              } 
            } else {
              return item;
            }
            
          });

          return itemsList;
      });


      return {
        matrix: newMatrix,
        total: totalSum
      }
     
     });
  };

  onHover = (rowIndex, colIndex) => {
    const matrix = this.state.matrix.map((item, i) => {
      const listItem = item.map((number, j) => {
        let diff = this.state.matrix[rowIndex][colIndex].value - number.value;
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
    this.setState((prevState) => ({ 
      matrix
    }));
  }

  onSumRow = (rowIndex) => {
    

    this.setState((prevState) => {

      const isvisible = prevState.matrix.map((item, i) => {
        if (i === rowIndex) {
          prevState.isvisible[i] = 'visible';
          return prevState.isvisible[i];
        } else {
          prevState.isvisible[i] = 'inVisible';
          return prevState.isvisible[i];
        }
      });
      let totalSum = updateTotal(prevState.matrix);
      
      return { 
        isvisible,
        total: totalSum
      }
      
    });  
  }

  onSumHide= (rowIndex) => {

    this.setState((prevState) => {

      const isvisible = prevState.matrix.map((item, i) => {
        if (i === rowIndex) {
          prevState.isvisible[i] = 'inVisible';
          return prevState.isvisible[i];
        }
      });
      let totalSum = updateTotal(prevState.matrix);
      
      return { 
        isvisible,
        total: totalSum
      }
      
    }); 


  }

  onDeleteRow = (rowIndex) => {
    
    this.setState((prevState) => { 

      const matrix = prevState.matrix.filter((item, i) => rowIndex !== i);
      let totalSum = updateTotal(prevState.matrix);

      return {
        matrix,
        total: totalSum
      }
      
    });  
  }

  onAddRow = () => {
    let newRow = [];
    for (let i = 0; i < 5; i++) {
      newRow[i] = {
          value: Math.floor(Math.random() * 1000),
          isActive: ''
      };
    }
    let totalSum = updateTotal(this.state.matrix);
    this.setState((prevState) => ({ 
      matrix: [...this.state.matrix, newRow],
      total: totalSum
     }));
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

    console.log(this.state.matrix);

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
                        onMouseOut={() => this.onSumHide(rowIndex)}
                      >
                          <strong>{summa}</strong>
                          <span>{parseInt(summa/this.state.total * 100)} %</span>
                      </td>  
                      <td className="deleteRow" onClick={() => this.onDeleteRow(rowIndex)}>Delete Row</td> 
                  </tr>
                )
              }
            )}
            <tr>
              {avrArr.map((item, i) => {       
                let avrItem = parseInt(item/this.state.matrix.length); 
                return (
                  <td key={i} className="avrArr">
                      {avrItem}
                  </td>
                )
                }
              )}
            </tr>
        </tbody>
        <tfoot>
                <tr>
                     <td className="addRow" onClick={() => this.onAddRow()}>Add Row</td> 
                </tr>
        </tfoot>
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
