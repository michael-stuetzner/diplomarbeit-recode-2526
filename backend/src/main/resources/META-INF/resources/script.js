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

function drawAvgRatingByRole(containerId) {
    fetchData().then(data => {
        // compute average feedback rating by userRole
        const avg = Array.from(
            d3.rollups(
                data,
                v => d3.mean(v, d => d.feedbackRating),
                d => d.userRole
            ),
            ([role, mean]) => ({ role, mean: +mean.toFixed(2) })
        );

        const svg = d3.select(`#${containerId} svg`);
        const width = parseFloat(svg.style('width'));
        const height = parseFloat(svg.style('height'));
        const margin = { top: height*0.1, right: width*0.05, bottom: height*0.2, left: width*0.2 };
        const innerW = width - margin.left - margin.right;
        const innerH = height - margin.top - margin.bottom;
        const g = svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`);

        const x = d3.scaleBand()
            .domain(avg.map(d => d.role))
            .range([0, innerW])
            .padding(0.3);

        const y = d3.scaleLinear()
            .domain([0, d3.max(avg, d => d.mean)])
            .nice()
            .range([innerH, 0]);

        g.append('g').call(d3.axisLeft(y).ticks(5));
        g.append('g').attr('transform', `translate(0,${innerH})`)
            .call(d3.axisBottom(x));

        g.selectAll('.bar')
            .data(avg)
            .enter().append('rect')
            .attr('class', 'bar')
            .attr('x', d => x(d.role))
            .attr('y', d => y(d.mean))
            .attr('width', x.bandwidth())
            .attr('height', d => innerH - y(d.mean));
    });
}

function drawDurationHistogram(containerId) {
    fetchData().then(data => {
        const durations = data.map(d => {
            const start = new Date(d.chatStartTime);
            const end = new Date(d.chatEndTime);
            return (end - start) / 1000; // seconds
        });
        const bins = d3.bin().thresholds(5)(durations);

        const svg = d3.select(`#${containerId} svg`);
        const width = parseFloat(svg.style('width'));
        const height = parseFloat(svg.style('height'));
        const margin = { top: height*0.1, right: width*0.05, bottom: height*0.2, left: width*0.1 };
        const innerW = width - margin.left - margin.right;
        const innerH = height - margin.top - margin.bottom;
        const g = svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`);

        const x = d3.scaleLinear()
            .domain([0, d3.max(durations)])
            .range([0, innerW]);

        const y = d3.scaleLinear()
            .domain([0, d3.max(bins, d => d.length)])
            .range([innerH, 0]).nice();

        g.append('g').call(d3.axisLeft(y).ticks(5));
        g.append('g').attr('transform', `translate(0,${innerH})`)
            .call(d3.axisBottom(x).ticks(5).tickFormat(d => `${d}s`));

        g.selectAll('rect')
            .data(bins)
            .enter().append('rect')
            .attr('x', d => x(d.x0))
            .attr('y', d => y(d.length))
            .attr('width', d => x(d.x1) - x(d.x0) - 1)
            .attr('height', d => innerH - y(d.length))
            .attr('fill', 'steelblue');
    });
}

function drawMessageCountChart(containerId) {
    fetchData().then(data => {
        const avgCount = Array.from(
            d3.rollups(
                data,
                v => d3.mean(v, d => d.messageCount),
                d => d.userRole
            ),
            ([role, mean]) => ({ role, mean: +mean.toFixed(2) })
        );

        const svg = d3.select(`#${containerId} svg`);
        const width = parseFloat(svg.style('width'));
        const height = parseFloat(svg.style('height'));
        const margin = { top: height*0.1, right: width*0.05, bottom: height*0.2, left: width*0.2 };
        const innerW = width - margin.left - margin.right;
        const innerH = height - margin.top - margin.bottom;
        const g = svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`);

        const x = d3.scaleBand()
            .domain(avgCount.map(d => d.role))
            .range([0, innerW])
            .padding(0.3);

        const y = d3.scaleLinear()
            .domain([0, d3.max(avgCount, d => d.mean)])
            .nice()
            .range([innerH, 0]);

        g.append('g').call(d3.axisLeft(y).ticks(5));
        g.append('g').attr('transform', `translate(0,${innerH})`)
            .call(d3.axisBottom(x));

        g.selectAll('.bar')
            .data(avgCount)
            .enter().append('rect')
            .attr('class', 'bar')
            .attr('x', d => x(d.role))
            .attr('y', d => y(d.mean))
            .attr('width', x.bandwidth())
            .attr('height', d => innerH - y(d.mean));

        // Achsentitel
        // Y-Achse Titel:
        svg.append('text')
            .attr('class', 'y label')
            .attr('text-anchor', 'middle')
            .attr('transform', `translate(${margin.left * 0.3},${margin.top + innerH / 2}) rotate(-90)`)
            .text('Average Messages');
        // X-Achse Titel:
        svg.append('text')
            .attr('class', 'x label')
            .attr('text-anchor', 'middle')
            .attr('x', margin.left + innerW / 2)
            .attr('y', height - margin.bottom * 0.3)
            .text('User Role');
    });
}

drawBarChart('satisfaction-chart', d => d.feedbackRating);
drawBarChart('role-count-chart', d => d.userRole);
drawAvgRatingByRole('role-avg-chart');
drawDurationHistogram('duration-chart');
drawMessageCountChart('message-count-chart');