import React from 'react';
import ReactDOM from 'react-dom';
import ReactTable from '../../dist/react-table';

class ReactTableExample extends React.Component
{
  get initialData()
  {
    return [{
      first_name: "Eddard",
      last_name: "Stark",
      house: "Stark"
    },{
      first_name: "Arya",
      last_name: "Stark",
      house: "Stark"
    },{
      first_name: "Tywin",
      last_name: "Lannister",
      house: "Lannister"
    },{
      first_name: "Joffrey",
      last_name: "Baratheon",
      house: "Lannister"
    }];
  }

  get nextData()
  {
    return [{
      first_name: "Robert",
      last_name: "Baratheon",
      house: "Baratheon"
    },{
      first_name: "Daenerys",
      last_name: "Targaryen",
      house: "Targaryen"
    },{
      first_name: "Tyrion",
      last_name: "Lannister",
      house: "Lannister"
    }]
  }

  get columns()
  {
    return [{
      name: "Name",
      accessor: "first_name"
    },{
      name: "Family Name",
      accessor: "last_name"
    },{
      name: "Full Name",
      accessor: function(row)
      {
        return row.first_name + ' ' + row.last_name;
      }
    },{
      name: "House",
      accessor: function(row)
      {
        return <a href={"http://gameofthrones.wikia.com/wiki/House_" + row.house} target="_blank">{row.house}</a>;
      }
    }];
  }

  constructor(props)
  {
    super(props);
    this.state = {};
    this.state.data = this.initialData;
    this.state.columns = this.columns;
  }

  handlePageChange(oldPage, lastObject, newPage)
  {
    switch(newPage)
    {
      case 1:
        this.setState({data: this.initialData});
        break;
      case 2:
        this.setState({data: this.nextData});
        break;
      default: 
        this.setState({data: this.initialData});
    }
  }

  render()
  {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <ReactTable data={this.state.data} columns={this.state.columns} onPageChange={this.handlePageChange.bind(this)} className='table table-striped' />
          </div>
        </div>
      </div>
    )
  }
}

ReactDOM.render(
    <ReactTableExample />,
    document.getElementById('react-container')
);