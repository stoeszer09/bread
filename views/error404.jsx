const React = require('react')
const Default = require('./layouts/default')

function error404 ()  {
    return (
      <Default>
        <h2>Error 404: Bread not found</h2>
      </Default>
    )
}

module.exports = error404