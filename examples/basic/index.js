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

  render()
  {
    return (
      <ReactTable data={this.state.data} columns={this.state.columns} />
    )
  }
}

ReactDOM.render(
    <ReactTableExample />,
    document.getElementById('react-container')
);