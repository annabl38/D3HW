// @TODO: YOUR CODE HERE!
var svgWidth = 960;
var svgHeight = 500;


var chartMargin = {
  top: 20,
  right: 40,
  bottom: 80,
  left: 100
};

var width = svgWidth - chartMargin.left - chartMargin.right;
var height = svgHeight - chartMargin.top - chartMargin.bottom;

var svg = d3
  .selectAll("#scatter")
  .append("svg")
  .attr("height", svgHeight)
  .attr("width", svgWidth);

var chartGroup = svg.append("g")
  .attr("transform", `translate(${chartMargin.left}, ${chartMargin.top})`);


d3.csv("assets/data/data.csv").then(function(healthData){
  healthData.forEach(function(data){
    data.poverty=+data.poverty
    data.obesity=+data.obesity
    data.abbr=data.abbr
    data.smokes=+data.smokes
  })

 
  var xScale = d3.scaleLinear()
    .domain([0,d3.max(healthData, d=>d.poverty)*1.05])
    .range([0,width])
  
  var yScale = d3.scaleLinear()
    .domain([d3.min(healthData, d=>d.smokes),d3.max(healthData, d=>d.smokes)*1.1])
    .range([height,0])
  
  var bottomAxis= d3.axisBottom(xScale)
  var leftAxis = d3.axisLeft(yScale)

  chartGroup.append('g')
    .attr('transform',`translate(0,${height})`)
    .call(bottomAxis)
  
  chartGroup.append('g')
    .call(leftAxis)
  
  // chartGroup.selectAll('text')
  //   .data(healthData)
  //   .enter()
  //   .append('text')
  //   .text(d=>d.abbr)
  //   .attr('x',d=>xScale(d.poverty))
  //   .attr('y',d=>yScale(d.obesity))
  //   .attr('fill','black')
  //   .attr('font-size','12px')
  //   .attr('opacity','1')
  //   .attr('text-anchor','middle')

  // chartGroup.selectAll('circle')
  //   .data(healthData)
  //   .enter()
  //   .append('circle')
  //     .attr('class','dot')
  //     .attr('cx',d=>xScale(d.poverty))
  //     .attr('cy',d=> yScale(d.obesity))
  //     .attr('r',"10")
  //     .attr('fill','lightblue')
  //     .attr('opacity','.5')
  //     .html(d=>d.abbr)
  var gdots = svg.selectAll('g.dot')
              .data(healthData)
              .enter().append('g')
  
  gdots.append('circle')
    .attr('class','dot')
    .attr('r',10)
    .attr('cx',d=>xScale(d.poverty))
    .attr('cy',d=>yScale(d.smokes))
    .attr('fill','lightblue')
    .attr('opacity','.5')
    .attr('stroke','black')
    .attr('stroke-width',2)

  gdots.append('text')
    .text(d=>d.abbr)
    .attr('x',d=>xScale(d.poverty))
    .attr('y',d=>yScale(d.smokes))
    .attr('dy',d=>5)
    .attr('text-anchor','middle')
    .attr('font-size','12px')
    .attr("fill",'black')



  chartGroup.append('text')
    .attr('transform',`translate(${width/2},${height+chartMargin.top+25})`)
    .attr('text-anchor','middle')
    .attr('font-size','16px')
    .attr('fill','black')
    .text('Poverty(%)')
  
  chartGroup.append('text')
    .attr('transform','rotate(-90)')
    .attr('y',-50)
    .attr('x',0-(height/2))
    .attr('text-anchor','middle')
    .attr('font-size','16px')
    .attr('fill','black')
    .text('Smokers(%)')

})