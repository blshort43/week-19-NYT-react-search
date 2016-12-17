// Include React
var React = require("react");
var Router = require('react-router');
var Search = require("./children/Search");
var Results = require("./children/grandchildren/Results");
var History = require("./children/grandchildren/Query");

var Main = React.createClass({

  // Here we render the function
  render: function() {

    return (

      <div className="container">
        <div className="jumbotron">
          <h2><strong>New York Times Article Scrubber</strong></h2>
          <hr />
          <p><em>Search for and annotate articles of interest!</em></p>
        </div>

        <div className="childDiv">

          {/* This code will dump the correct Child Component */}
          {/*{this.props.children}*/}
          <Search />
        </div>

      </div>
    );
  }
});

// Export the componen back for use in other files
module.exports = Main;
