# React Table

React Table is a simple, light weight table built on React. It makes no assumptions about your data and allows you to define how the table reacts to pagination, filtering and sorting.

# Usage

Create a simple table by passing the data and the columns props.

## Example

~~~~ 
data: [{
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

columns: [{
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
~~~~~

Data: An array of objects to be used by the table

Column: An array of objects containing two properties- name, and accesssor. Name defines the header for the column and accessor can be the property name or a function that returns string or JSX.

## Sorting

React table allows you to define a handler for a sort event. The handler is passed the column object. You can handle sorting locally, or fetch the results from your server and update the data.

Set the `onSort` prop with your event handler.

## Filtering

Similar to sorting, you define a handler on the filter event. The handler is passed the value input by the user in the filter box.

Set the `onFilter` prop with your event handler.

## Pagination

Similar to sorting, you define a handler on the pagination event. The handler is passed the current page number, the last object displayed on the table and the new page number.

Set the `onPageChange` prop with your event handler.

## Styling

You can add styling to the table by passing CSS classes or IDs using the default className and ID prop. These are passed to the underlying table element. This allows you to use table styling from frameworks like bootstrap.

A basic stylesheet is available with this project. However, it is very simplistic and it is recommended that you use your own styling.

# Development

* Clone this repository.
* Run `npm install`
* Run dev watch builds- `npm start`

To create a build, run `npm run dist`.

# License

MIT License