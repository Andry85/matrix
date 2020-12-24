import styles from './Table.module.scss';
import React from 'react';

import { connect } from 'react-redux'
import { addCreator } from '../../redux/actions'


const matrix = function setMatrix() {
  let array = [];

  for (let i = 0; i < 10; i++) {
    array[i] = [];
    for (let j = 0; j < 10; j++) {

      array[i][j] = Math.floor(Math.random() * 100);

    }
  }
}

const INITIAL_STATE = {
  matrix: matrix,
};


class Table extends React.Component {
  constructor(props) {
    super(props);
    this.state = INITIAL_STATE;
  }

  componentDidMount() {
    let matrix = [];

    for (let i = 0; i < this.state.rows; i++) {
      matrix[i] = [];
      for (let j = 0; j < this.state.cols; j++) {

        matrix[i][j] = Math.floor(Math.random() * 100);

      }
    }

    this.setState(state => {
      return {
        matrix: matrix
      }
    });

  }

  onUpdateItem = i => {
    this.setState(state => {
      const matrix = state.matrix.map((item, j) => {



      });

      return {
        matrix,
      };
    });

    console.log(this.state.matrix);
  };


  render() {


    return (
      <table className="table table-bordered">
        <tbody>

            {this.state.matrix.map((item, index) => {
                  return (
                    <tr key={index}>
                        {item.map((item, index) => {
                            return (
                              <td key={index}>
                                  {item}
                                  <button type="button" onClick={() => this.onUpdateItem(index)}>Add 1</button>
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
