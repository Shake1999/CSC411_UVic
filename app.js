var foodPrices = [];
for (const foodItem of ['rice','apple','egg','lettuce','corn']) {
    for (const c of ['Chad','Japan','Mexico']){
        for (let year = 2011; year<=2020; year++){
            foodPrices.push({foodName: foodItem, country: c, year: year, cost: Math.round(Math.random()*24 + 1)})
        }
    }
}

const maxWidth = 800;
const maxHeight = 700;
const lineLength = 300;
const incline = 0.5235987756;

// linear scale for chad
const ylineScale1 = d3.scaleLinear()
                    .domain([1,25])
                    .range([maxHeight/2, maxHeight/2-lineLength]);

let svg = d3.select('div#container1')
            .append('svg')
            .attr('width', maxWidth)
            .attr('height', maxHeight)
            .style('background-color', 'white'); //#fde0dd

svg.append('g')
    .attr('transform', function(d,i){
        return 'translate(0,0)';
    })
    .attr('id','povertyCircle');

/// LINE 1 ///
let line1 = svg.append('g')
                .attr('transform', function(d,i){
                    return 'translate(0,0)';
                });
line1.append('line')
    .style('stroke','#e7e1ef')
    .style('stroke-width',3)
    .attr('id','line1')
    .attr('x1',maxWidth/2)
    .attr('y1',maxHeight/2)
    .attr('x2',maxWidth/2)
    .attr('y2',maxHeight/2-lineLength);
line1.append('text')
    .attr('x',maxWidth/2-30)
    .attr('y',maxHeight/2-lineLength-10)
    .attr('stroke','black')
    .attr('font-family','sans-serif')
    .attr('font-size','18px')
    .classed('countryName',true)
    .text('Chad');

var default_selected_foods = Array.from(document.querySelectorAll("input[type='checkbox'][name='food']:checked"))
                                        .map(obj => obj.value);

// Plotting CHAD food points //
line1.selectAll('.country1')
    .data(foodPrices.filter(obj => 
            obj.country == 'Chad' &&
            obj.year == parseInt(document.querySelector("input[type='radio'][name='year']:checked").value) &&
            default_selected_foods.includes(obj.foodName)))
    .enter()
    .append('circle')
    .classed('country1',true)
    .attr('cx',maxWidth/2)
    .attr('cy',data => ylineScale1(data.cost))
    .attr('r', 5)
    .style('fill', function(data){
            if (data.foodName == 'rice'){
                return '#003f5c';
            }
            else if (data.foodName == 'apple'){
                return '#58508d';
            }
            else if (data.foodName == 'egg'){
                return '#bc5090';
            }
            else if (data.foodName == 'lettuce'){
                return '#ff6361';
            }
            else{
                return '#ffa600';
            }
    });

// linear scales for Japan
const xlineScale2 = d3.scaleLinear()
                        .domain([1,25])
                        .range([maxWidth/2, maxWidth/2-(lineLength*Math.cos(incline))]);
const ylineScale2 = d3.scaleLinear()
                        .domain([1,25])
                        .range([maxHeight/2, maxHeight/2+(Math.sqrt(Math.pow(lineLength,2)-Math.pow(lineLength*Math.cos(incline),2)))]);
      
/// LINE 2 ///
let line2 = svg.append('g')
                .attr('transform', function(d,i){
                    return 'translate(0,0)';
                });
line2.append('line')
    .style('stroke','#e7e1ef')
    .style('stroke-width',3)
    .attr('id','line2')
    .attr('x1',maxWidth/2)
    .attr('y1',maxHeight/2)
    .attr('x2',maxWidth/2-(lineLength*Math.cos(incline)))
    .attr('y2',maxHeight/2+(Math.sqrt(Math.pow(lineLength,2)-Math.pow(lineLength*Math.cos(incline),2))));
line2.append('text')
    .attr('x',maxWidth/2-(lineLength*Math.cos(incline))-40)
    .attr('y',maxHeight/2+(Math.sqrt(Math.pow(lineLength,2)-Math.pow(lineLength*Math.cos(incline),2)))+30)
    .attr('stroke','black')
    .attr('font-family','sans-serif')
    .attr('font-size','18px')
    .classed('countryName',true)
    .text('Japan');

// Plotting Japan food points //
line2.selectAll('.country2')
    .data(foodPrices.filter(obj => 
            obj.country == 'Japan' &&
            obj.year == parseInt(document.querySelector("input[type='radio'][name='year']:checked").value) &&
            default_selected_foods.includes(obj.foodName)))
    .enter()
    .append('circle')
    .classed('country2',true)
    .attr('cx',data => xlineScale2(data.cost))
    .attr('cy',data => ylineScale2(data.cost))
    .attr('r', 5)
    .style('fill', function(data){
            if (data.foodName == 'rice'){
                return '#003f5c';
            }
            else if (data.foodName == 'apple'){
                return '#58508d';
            }
            else if (data.foodName == 'egg'){
                return '#bc5090';
            }
            else if (data.foodName == 'lettuce'){
                return '#ff6361';
            }
            else{
                return '#ffa600';
            }
    });

// linear scales for Mexico
const xlineScale3 = d3.scaleLinear()
                        .domain([1,25])
                        .range([maxWidth/2, maxWidth/2+(lineLength*Math.cos(incline))]);
const ylineScale3 = d3.scaleLinear()
                        .domain([1,25])
                        .range([maxHeight/2, maxHeight/2+(Math.sqrt(Math.pow(lineLength,2)-Math.pow(lineLength*Math.cos(incline),2)))]);

/// LINE 3 ///
let line3 = svg.append('g')
                .attr('transform', function(d,i){
                    return 'translate(0,0)';
                });
line3.append('line')
    .style('stroke','#e7e1ef')
    .style('stroke-width',3)
    .attr('id','line3')
    .attr('x1',maxWidth/2)
    .attr('y1',maxHeight/2)
    .attr('x2',maxWidth/2+(lineLength*Math.cos(incline)))
    .attr('y2',maxHeight/2+(Math.sqrt(Math.pow(lineLength,2)-Math.pow(lineLength*Math.cos(incline),2))));
line3.append('text')
    .attr('x',maxWidth/2+(lineLength*Math.cos(incline))+10)
    .attr('y',maxHeight/2+(Math.sqrt(Math.pow(lineLength,2)-Math.pow(lineLength*Math.cos(incline),2)))+30)
    .attr('stroke','black')
    .attr('font-family','sans-serif')
    .attr('font-size','18px')
    .classed('countryName',true)
    .text('Mexico');
        
// Plotting Mexico food points //
line3.selectAll('.country3')
    .data(foodPrices.filter(obj => 
            obj.country == 'Mexico' &&
            obj.year == parseInt(document.querySelector("input[type='radio'][name='year']:checked").value) &&
            default_selected_foods.includes(obj.foodName)))
    .enter()
    .append('circle')
    .classed('country3',true)
    .attr('cx',data => xlineScale3(data.cost))
    .attr('cy',data => ylineScale3(data.cost))
    .attr('r', 5)
    .style('fill', function(data){
            if (data.foodName == 'rice'){
                return '#003f5c';
            }
            else if (data.foodName == 'apple'){
                return '#58508d';
            }
            else if (data.foodName == 'egg'){
                return '#bc5090';
            }
            else if (data.foodName == 'lettuce'){
                return '#ff6361';
            }
            else{
                return '#ffa600';
            }
    });

/*
//Rice Connected Line //
let riceLines = svg.append('g')
                  .attr('transform', function(d,i){
                      return 'translate(0,0)';
                });
riceLines.append('line')
            .style('stroke','#003f5c')
            .style('stroke-width',2)
            .attr('x1',maxWidth/2)
            .attr('y1',(maxHeight/2)-16.92)
            .attr('x2',maxWidth/2 - 268.68*Math.cos(incline))
            .attr('y2',maxHeight/2+(Math.sqrt(Math.pow(268.68,2)-Math.pow(268.68,2)*Math.pow(Math.cos(incline),2))));
        
riceLines.append('line')
            .style('stroke','#003f5c')
            .style('stroke-width',2)
            .attr('x1',maxWidth/2)
            .attr('y1',(maxHeight/2)-16.92)
            .attr('x2',maxWidth/2 + 18.12*Math.cos(incline))
            .attr('y2',maxHeight/2 + Math.sqrt(Math.pow(18.12,2)-Math.pow(18.12,2)*Math.pow(Math.cos(incline),2)));

riceLines.append('line')
            .style('stroke','#003f5c')
            .style('stroke-width',2)
            .attr('x1',maxWidth/2 - 268.68*Math.cos(incline))
            .attr('y1',maxHeight/2+(Math.sqrt(Math.pow(268.68,2)-Math.pow(268.68,2)*Math.pow(Math.cos(incline),2))))
            .attr('x2',maxWidth/2 + 18.12*Math.cos(incline))
            .attr('y2',maxHeight/2 + Math.sqrt(Math.pow(18.12,2)-Math.pow(18.12,2)*Math.pow(Math.cos(incline),2)));
*/

function onSelectionChange(){
    var current_year = parseInt(document.querySelector("input[type='radio'][name='year']:checked").value);
    var current_foods = Array.from(document.querySelectorAll("input[type='checkbox'][name='food']:checked"))
                            .map(obj => obj.value);
    
    line1.selectAll('.country1')
            .remove();
    line2.selectAll('.country2')
            .remove();
    line3.selectAll('.country3')
            .remove();
    
    line1.selectAll('.country1')
        .data(foodPrices.filter(obj =>
                obj.country == 'Chad' &&
                obj.year == current_year &&
                current_foods.includes(obj.foodName)))
        .enter()
        .append('circle')
        .classed('country1',true)
        .attr('cx', maxWidth/2)
        .attr('cy', data=> ylineScale1(data.cost))
        .attr('r', 5)
        .style('fill',function(data){
            if (data.foodName == 'rice'){
                return '#003f5c';
            }
            if (data.foodName == 'apple'){
                return '#58508d';
            }
            if (data.foodName == 'egg'){
                return '#bc5090';
            }
            if (data.foodName == 'lettuce'){
                return '#ff6361';
            }
            else{
                return '#ffa600';
            }
        });
    
    line2.selectAll('.country2')
        .data(foodPrices.filter(obj =>
                obj.country == 'Japan' &&
                obj.year == current_year &&
                current_foods.includes(obj.foodName)))
        .enter()
        .append('circle')
        .classed('country2',true)
        .attr('cx',data => xlineScale2(data.cost))
        .attr('cy',data => ylineScale2(data.cost))
        .attr('r', 5)
        .style('fill',function(data){
            if (data.foodName == 'rice'){
                return '#003f5c';
            }
            if (data.foodName == 'apple'){
                return '#58508d';
            }
            if (data.foodName == 'egg'){
                return '#bc5090';
            }
            if (data.foodName == 'lettuce'){
                return '#ff6361';
            }
            else{
                return '#ffa600';
            }
        });
    
    line3.selectAll('.country3')
        .data(foodPrices.filter(obj =>
                obj.country == 'Mexico' &&
                obj.year == current_year &&
                current_foods.includes(obj.foodName)))
        .enter()
        .append('circle')
        .classed('country3',true)
        .attr('cx',data => xlineScale3(data.cost))
        .attr('cy',data => ylineScale3(data.cost))
        .attr('r', 5)
        .style('fill',function(data){
            if (data.foodName == 'rice'){
                return '#003f5c';
            }
            if (data.foodName == 'apple'){
                return '#58508d';
            }
            if (data.foodName == 'egg'){
                return '#bc5090';
            }
            if (data.foodName == 'lettuce'){
                return '#ff6361';
            }
            else{
                return '#ffa600';
            }
        });
}

/// Trying interactive ///
d3.selectAll('line')
    .on('mouseover', function(){
        d3.select(this)
            .style('stroke-width',5);

        let margin = 40;
        let width = 480;
        let height = 480;
                
        let trend_svg = d3.select('div#container2')
                            .append('svg')
                            .attr('id','foodTrend')
                            .attr('width', width + 2*margin)
                            .attr('height', height + 2*margin)
                            .style('background-color', 'white')
                            .append('g')
                            .attr('transform','translate('+(margin+20)+','+margin+')');
        
        var x = d3.scaleLinear()
                    .domain([2011,2020])
                    .range([0, width]);
        trend_svg.append('g')
            .attr('transform','translate(0,'+height+')')
            .call(d3.axisBottom(x).tickFormat(d3.format('d')));
        
        var y = d3.scaleLinear()
                    .domain([1,30])
                    .range([height, 0]);
        trend_svg.append('g')
            .call(d3.axisLeft(y));
        
        //// X Axis Label ////
        trend_svg.append('g')
                .append('text')
                .attr('text-anchor','end')
                .attr('x', width/2)
                .attr('y', height+35)
                .attr('transform','translate(0,0)')
                .style('font-size',15)
                .style('font-weight','bold')
                .text('Years');
        
        //// Y Axis Labell ////
        trend_svg.append('g')
                .append('text')
                .attr('text-anchor','end')
                .attr('x', 0)
                .attr('y', 0)
                .attr('transform','translate(-30,200) rotate(-90)')
                .style('font-size',15)
                .style('font-weight','bold')
                .text('Cost ($)');

        ///// User Food Selections /////
        var current_foods = Array.from(document.querySelectorAll("input[type='checkbox'][name='food']:checked"))
                            .map(obj => obj.value);
        ///// DATA /////
        var trend_data;
        if (this.id == 'line1'){
            //// TITLE of graph ////
            trend_svg.append('g')
                    .append('text')
                    .attr('x',150)
                    .attr('y',0)
                    .attr('transform','translate(0,0)')
                    .style('font-size',15)
                    .style('font-weight','bold')
                    .text('Trend of food item prices in Chad');
            trend_data = foodPrices.filter(obj => obj.country == 'Chad' &&
                                                    current_foods.includes(obj.foodName));
        }
        else if (this.id == 'line2'){
            //// TITLE of graph ////
            trend_svg.append('g')
                    .append('text')
                    .attr('x',150)
                    .attr('y',0)
                    .attr('transform','translate(0,0)')
                    .style('font-size',15)
                    .style('font-weight','bold')
                    .text('Trend of food item prices in Japan');
            trend_data = foodPrices.filter(obj => obj.country == 'Japan' &&
                                                    current_foods.includes(obj.foodName));
        }
        else{
            //// TITLE of graph ////
            trend_svg.append('g')
                    .append('text')
                    .attr('x',150)
                    .attr('y',0)
                    .attr('transform','translate(0,0)')
                    .style('font-size',15)
                    .style('font-weight','bold')
                    .text('Trend of food item prices in Mexico');
            trend_data = foodPrices.filter(obj => obj.country == 'Mexico' &&
                                                    current_foods.includes(obj.foodName));
        }
        
        trend_svg
            .append('g')
            .append('path')
                .datum(trend_data.filter(obj => obj.foodName=='rice'))
                .attr('d',d3.line()
                            .x(function(d){ return x(+d.year)})
                            .y(function(d){ return y(+d.cost)})
                            )
                .attr('stroke','#003f5c')
                .style('stroke-width',2)
                .style('fill','none');        
        
        trend_svg
            .append('g')
            .append('path')
                .datum(trend_data.filter(obj => obj.foodName=='apple'))
                .attr('d',d3.line()
                            .x(function(d){ return x(+d.year)})
                            .y(function(d){ return y(+d.cost)})
                            )
                .attr('stroke','#58508d')
                .style('stroke-width',2)
                .style('fill','none');
        
        trend_svg
            .append('g')
            .append('path')
                .datum(trend_data.filter(obj => obj.foodName=='egg'))
                .attr('d',d3.line()
                            .x(function(d){ return x(+d.year)})
                            .y(function(d){ return y(+d.cost)})
                            )
                .attr('stroke','#bc5090')
                .style('stroke-width',2)
                .style('fill','none');
        
        trend_svg
            .append('g')
            .append('path')
                .datum(trend_data.filter(obj => obj.foodName=='lettuce'))
                .attr('d',d3.line()
                            .x(function(d){ return x(+d.year)})
                            .y(function(d){ return y(+d.cost)})
                            )
                .attr('stroke','#ff6361')
                .style('stroke-width',2)
                .style('fill','none');
        
        trend_svg
            .append('g')
            .append('path')
                .datum(trend_data.filter(obj => obj.foodName=='corn'))
                .attr('d',d3.line()
                            .x(function(d){ return x(+d.year)})
                            .y(function(d){ return y(+d.cost)})
                            )
                .attr('stroke','#ffa600')
                .style('stroke-width',2)
                .style('fill','none');
    })
    .on('mouseout', function(){
        d3.select(this)
            .style('stroke-width',2);
        d3.select('#foodTrend')
            .remove();
    });

d3.csv("https://raw.githubusercontent.com/Shake1999/CSC411_UVic/main/world_poverty.csv")
    .then(function(this_data){
        /// POVERTY CIRCLE LINE ///
        svg.select('#povertyCircle')
            .append('circle')
            .style('stroke','black')
            .style('stroke-width',1)
            .style('stroke-dasharray',15)
            .style('fill','transparent')
            .attr('r',ylineScale1(21.8))
            .attr('cx',maxWidth/2)
            .attr('cy',maxHeight/2);
        
        //// POVERTY ////
        const parsedPovertyData = this_data.map(item => {
            return {Entity: item.Entity, Year: parseInt(item.Year), PovPopulation: +(parseFloat(item.PovPopulation).toFixed(2))};
        });
        
        var poverties = parsedPovertyData.filter(obj => {
            return (obj.Entity == 'Chad' || obj.Entity == 'Japan' || obj.Entity == 'Mexico') && (obj.Year>2011);
        });
        
        poverties.push({Entity: 'Chad', Year: 2011, PovPopulation: 55.43});
        poverties.push({Entity: 'Chad', Year: 2015, PovPopulation: 30.43});
        poverties.push({Entity: 'Chad', Year: 2020, PovPopulation: 28.43});
        poverties.push({Entity: 'Japan', Year: 2011, PovPopulation: 2.5});
        poverties.push({Entity: 'Japan', Year: 2015, PovPopulation: 0.854});
        poverties.push({Entity: 'Japan', Year: 2020, PovPopulation: 1.45});
        poverties.push({Entity: 'Mexico', Year: 2011, PovPopulation: 15.322});
        poverties.push({Entity: 'Mexico', Year: 2015, PovPopulation: 11.5});

        console.log(poverties);

        var thisCountryName;
        d3.selectAll('.countryName')
            .on('mouseover', function(){
                thisCountryName = this.textContent;
                d3.select(this)
                    .text(function(){
                        var selectedYear = parseInt(document.querySelector("input[type='radio'][name='year']:checked").value);
                        var pov = poverties.find(obj => 
                            obj.Entity == thisCountryName &&
                            obj.Year == selectedYear);
                        return `${this.textContent}: ${pov.PovPopulation}%`;
                    })
                    .attr('transform', 'translate(' + (-this.textContent.length*2) + ',' + 0 + ')')
                    .classed('povInfo',true);
            })
            .on('mouseout', function(){
                d3.select('.povInfo')
                    .text(thisCountryName)
                    .classed('povInfo',false)
                    .attr('transform','translate(0,0)');
            });
    }
);