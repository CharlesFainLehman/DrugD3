function AnnualBarPlot(svg, data, year) {
	
	var margin = {top: 20, right: 20, bottom: 50, left: 50, axis: 40},
    width = 690 - margin.left - margin.right,
    height = 440 - margin.top - margin.bottom,
	currentYearData = [];
	
	//grab only the data associate with the year
	for (var i = 0; i < data.length; i++) { if(data[i]['year'] == year) { currentYearData.push(data[i]) }}
	
	var barWidth = (width/currentYearData.length),
	maxHeight = d3.max(data, function(d){return d.rate});
	
	//clear the old bars, set up the new one.
	svg.selectAll("rect").remove();
	var barChart = svg.selectAll('rect')
	.data(currentYearData)
	.enter()
	.append("rect")
	.attr('y', function(d){ return height - d['rate'] * (height/maxHeight); })
	.attr("height", function(d) { return d['rate'] * (height/maxHeight); })
	.attr("width", barWidth)
	.attr("transform", function (d,i) {
	     var translate = barWidth * i;
	     return "translate("+ translate +")";
	})
	.style('fill', '#FC3803');		
}

function MakeDeathChart(svg, dataset, maxHeight, currentYear) {
//And here are the functions
	var currentYearData = [];
	for (var i = 0; i < dataset.length; i++) { if(dataset[i]["year"] == currentYear) { currentYearData.push(dataset[i]) }}
	var barWidth = (width/currentYearData.length);
	
	//clear the old bars, set up the new one.
	svg.selectAll("rect").remove();
	var barChart = svg.selectAll('rect');
	
	barChart.data(currentYearData)
	.enter()
	.append("rect")
	.attr('y', function(d){
		return height - d['rate'] * (height/maxHeight);
	})
	.attr("height", function(d) {
	    return d['rate'] * (height/maxHeight);
	})
	.attr("width", barWidth)
	.attr("transform", function (d,i) {
	     var translate = barWidth * i;
	     return "translate("+ translate +")";
	})
	.style('fill', '#FC3803');		
}
	
function setUpAxes(svg, ageRange, rateMax){
	d3.selectAll('.graph_axis').remove();
		//x axis
	var x = d3.scaleLinear().range([0, width]).domain(ageRange);
	svg.append("g")
	.attr("transform", "translate(0," + height + ")")
	.attr('class', 'graph_axis')
	.call(d3.axisBottom(x));
	
	//x axis label
	svg.append("text")             
	.attr("transform",
		"translate(" + (width/2) + " ," + (height + margin.axis) + ")")
	.attr('class', 'graph_axis')
	.style("text-anchor", "middle")
	.text("Age");
		
	//y axis
	var y = d3.scaleLinear().range([height, 0]).domain([0, rateMax]);
	svg.append("g")
	.attr('class', 'graph_axis')
	.call(d3.axisLeft(y));
	
	//y axis label
	svg.append("text")
	.attr("transform", "rotate(-90)")
	.attr("y", 0 - margin.axis)
	.attr("x",0 - (height / 2))
	.attr("dy", "1em")
	.attr('class', 'graph_axis')
	.style("text-anchor", "middle")
	.text("Drug Overdose Deaths per 100,000 pop.");
}
		
function updateTitle(svg, year){
	//title
	svg.select('#title').remove();
	svg.append("text")
	.attr("x", 20)
	.attr("y", -10)
	.attr('id', 'title')
	.attr('class', 'text')
	.text("Drug Overdose Deaths by Age Group (" + year + ")");
}