const express = require('express');
const PanelApp = express();

require('./backend/scripts/api.js');

PanelApp.use(express.static('./frontend/control_panel'));

PanelApp.listen(3001, function() 
{
  console.log('\nControl Panel Server Running on Port 3001');
});





