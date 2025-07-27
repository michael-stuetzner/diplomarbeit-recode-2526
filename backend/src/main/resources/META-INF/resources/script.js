async function fetchData() {
    const data = await d3.json('/UserData/all');
    return data;
}

function drawBarChart(containerId, valueAccessor) {
    fetchData().then(data => {
        const counts = d3.rollups(data, v => v.length, valueAccessor)
            .sort((a, b) => a[0] > b[0] ? 1 : -1);
        const svg = d3.select(`#${containerId} svg`);
        const width = parseFloat(svg.style('width'));
        const height = parseFloat(svg.style('height'));
        const margin = { top: height * 0.1, right: width * 0.05, bottom: height * 0.2, left: width * 0.1 };
        const innerWidth = width - margin.left - margin.right;
        const innerHeight = height - margin.top - margin.bottom;
        const g = svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`);

        const x = d3.scaleBand()
            .domain(counts.map(d => d[0]))
            .range([0, innerWidth])
            .padding(0.1);

        const y = d3.scaleLinear()
            .domain([0, d3.max(counts, d => d[1])])
            .nice()
            .range([innerHeight, 0]);

        g.append('g').call(d3.axisLeft(y).ticks(5));
        g.append('g').attr('transform', `translate(0,${innerHeight})`)
            .call(d3.axisBottom(x));

        g.selectAll('.bar')
            .data(counts)
            .enter().append('rect')
            .attr('class', 'bar')
            .attr('x', d => x(d[0]))
            .attr('y', d => y(d[1]))
            .attr('width', x.bandwidth())
            .attr('height', d => innerHeight - y(d[1]));
    });
}

drawBarChart('satisfaction-chart', d => d.feedbackRating);
drawBarChart('role-count-chart', d => d.userRole);