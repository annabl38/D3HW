// @TODO: YOUR CODE HERE!
var svgWidth = 960;
var svgHeight = 660;


var chartMargin = {
  top: 30,
  right: 30,
  bottom: 30,
  left: 30
};

var width = svgWidth - chartMargin.left - chartMargin.right;
var height = svgHeight - chartMargin.top - chartMargin.bottom;

var svg = d3
  .selectAll("scatter")
  .append("svg")
  .attr("height", svgHeight)
  .attr("width", svgWidth);

var chartGroup = svg.append("g")
  .attr("transform", `translate(${chartMargin.left}, ${chartMargin.top})`);


d3.csv("assets/data/data.csv",function(healthData){
  var poverty = healthData.poverty
  var obesity = healthData.obesity
  console.log(obesity)
  var xScale = d3.scaleLinear()
    .domain([0,d3.max(poverty)])
    .range([0,width])

  var yScale = d3.scaleLinear()
    .domain([0,d3.max(obesity)])
    .range([height,0])
  

  var circles= chartGroup.selectAll('circle')

  circles.data(healthData)
    .enter()
    .append('circle')
    .attr('cx',function(d){return xScale(d.poverty)})
    .attr('cy',function(d){return yScale(d.obesity)})
    .attr('r',10)
    .attr('fill','blue')
})