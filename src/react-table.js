import React, {PropTypes} from 'react';

class ReactTable extends React.Component{
  static propTypes()
  {
    return {
      data: PropTypes.array,
      columns: PropTypes.array,
      onPageChange: PropTypes.func,
      onSort: PropTypes.func,
      onFilter: PropTypes.func
    }
  }

  constructor(props)
  {
    super(props);
    // Initial setup
    this.initialState = {};

    if(props.onPageChange)
    {
      this.initialState.currentPage = 1;
      this.initialState.lastObject = props.data[props.data.length-1];
    }
    if(props.onFilter)
    {
      this.initialState.filterInput = '';
    }

    this.state = this.initialState;
  }

  componentWillReceiveProps(nextProps)
  {
    // Might have unnecessary updates.
    this.setState({lastObject: nextProps.data[nextProps.data.length - 1]});
  }

  sortColumn(column)
  {
    if(this.props.onSort)
    {
      this.props.onSort(column);
    }
  }

  generateColumn(col,index)
  {
    return <th key={col.name} onClick={this.sortColumn.bind(this,col)}>{col.name}</th>;
  }

  showPrevious()
  {
    if(this.props.onPageChange)
    {
      this.props.onPageChange(this.state.currentPage, this.state.lastObject, this.state.currentPage -1);
      this.setState({currentPage: this.state.currentPage-1});
    }
  }

  showNext()
  {
    if(this.props.onPageChange)
    {
      this.props.onPageChange(this.state.currentPage, this.state.lastObject, this.state.currentPage + 1);
      this.setState({currentPage: this.state.currentPage+1});
    }
  }

  renderPagination()
  {
    return (
      <div className="rt-pagination">
        {this.state.currentPage != 1? <div className="previous-page"><a onClick={this.showPrevious.bind(this)}>Previous</a></div> : ''}
        <div className="next-page"><a onClick={this.showNext.bind(this)}>Next</a></div>
      </div>
    );
  }

  onFilterInputChange(e)
  {
    this.setState({filterInput: e.target.value});
    if(this.props.onFilter)
    {
      this.props.onFilter(e.target.value);
    }
  }

  render()
  {
    const { data, columns, onPageChange, onFilter, onSort, ...props } = this.props;
    return (
      <div className="react-table">
        {this.props.onFilter? 
          <div className="rt-filter"><input type="text" placeholder="Search table" value={this.state.filterInput} onChange={this.onFilterInputChange.bind(this)}/></div> 
          : ''
        }
        <table {...props}>
          <thead>
            <tr key="table-header">{this.props.columns.map(this.generateColumn, this)}</tr>
          </thead>
          <tbody>
            {this.props.data.map((row,rowIndex) => 
              {
                return(
                  <tr key={rowIndex}>
                    {this.props.columns.map((col,colIndex) => 
                      {
                        let rowHtml;

                        if(typeof col.accessor === "function")
                        {
                          rowHtml = <td key={col.name + rowIndex}>{col.accessor(row,rowIndex)}</td>
                        }
                        else
                        {
                          rowHtml = <td key={col.name + rowIndex}>{row[col.accessor.toString()]}</td>;
                        }

                        return rowHtml;
                      })
                    }
                  </tr>  
                );
              }
            )}
          </tbody>
        </table>
        {this.props.onPageChange? this.renderPagination(): ''}
      </div>
    )
  }
}

export default ReactTable;