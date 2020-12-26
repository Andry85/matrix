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
        value: Math.floor(Math.random() * 10000),
        isActive: ''
      };

      total = total + array[i][j].value;

    }
  }

  return array;

})();





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

    let totalSum = 0;
    let newMatrix = this.state.matrix.map((items, i) => {
      items.map((number, j) => {
        totalSum = totalSum + number.value;
        if (number.value === this.state.matrix[rowIndex][colIndex].value && i === rowIndex && j === colIndex) {
          number.value = number.value + 1;
        }
        return number;
      });
      return items;
    });



    this.setState((prevState) => ({ 
      matrix: newMatrix,
      total: totalSum
     }));

    


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

    const isvisible = this.state.matrix.map((item, i) => {
      if (i === rowIndex) {
        this.state.isvisible[i] = 'visible';
        return this.state.isvisible[i];
      } else {
        this.state.isvisible[i] = 'inVisible';
        return this.state.isvisible[i];
      }
    });

    this.setState((prevState) => ({ 
      isvisible
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
