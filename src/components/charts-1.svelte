<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import { Chart, registerables } from 'chart.js';
	import {
		alterNumberFormat,
		chartDatasetOptions,
		chartOptions,
		getRandomColor,
		numberFormat
	} from '$lib/globals';
	import {
		Icon,
		DevicePhoneMobile,
		ComputerDesktop,
		RectangleStack,
		ServerStack,
		CircleStack,
		Newspaper,
		CpuChip,
		Users,
		ChartBar,
		ArrowTrendingUp,
		RectangleGroup,
		AdjustmentsHorizontal
	} from 'svelte-hero-icons';
	import CountAnim from './count-anim.svelte';
	Chart.register(...registerables);
	let categoriesItemChart: any;
	let countItemsChart: any;
	let dougChartOfCountItem: any;
	let trendingChartElement: any;
	let visitorsChartElement: any;
	export let countData: any;
	console.log(countData)
	let width: any, height: any, gradient: any;
	function getGradient(ctx: any, chartArea: any) {
		const chartWidth = chartArea.right - chartArea.left;
		const chartHeight = chartArea.bottom - chartArea.top;
		if (!gradient || width !== chartWidth || height !== chartHeight) {
			width = chartWidth;
			height = chartHeight;
			gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
			gradient.addColorStop(0, getRandomColor(1));
			gradient.addColorStop(0.5, getRandomColor(1));
			gradient.addColorStop(1, getRandomColor(1));
		}

		return gradient;
	}
	onMount(() => {
		trendingChartElement = new Chart(trendingChartElement, {
			type: 'line',
			data: {
				labels: Array(countData.views_phones.length)
					.fill()
					.map((_, index) => index + 1),
				datasets: [
					{
						label: "Top Mobile's views",
						data: countData.views_phones,
						...getRandomColor(1, true, 1, 0.5),
						borderWidth: 2
					},
					{
						label: 'Most Firmwares Views',
						data: countData.views_firms,
						...getRandomColor(1, true, 0.5),
						borderWidth: 2
					},
					{
						label: 'Most Computers Views',
						data: countData.views_computer,
						...getRandomColor(1, true, 0.5),
						borderWidth: 2
					},
					{
						label: 'Top Blogs',
						data: countData.views_blogs,
						...getRandomColor(1, true, 0.5),
						borderWidth: 2
					}
				]
			},

			...chartOptions('TRENDING POST', true, { display: true,beginAtZero: false, })
		});
		categoriesItemChart = new Chart(categoriesItemChart, {
			type: 'bar',
			data: {
				labels: countData.categories.map((e:any) => e.category),
				datasets: [
					{
						label: 'Devices in each categories',
						data: countData.categories.map((e) => e.items),
						...chartDatasetOptions(),
						borderWidth: 2,
						borderRadius: 18
					}
				]
			},
			...chartOptions('PHONES CATEGORIES', true, { display: true })
		});
		visitorsChartElement = new Chart(visitorsChartElement, {
			type: 'radar',
			data: {
				labels: ['Home', 'Blogs', 'Computers', 'Firmwares', 'Mobiles', 'Image Processing'],
				datasets: [
					{
						label: 'Number of visitors on each page',
						data: [
							countData.home_visitors,
							countData.blog_visitors,
							countData.computer_visitors,
							countData.firmwares_visitors,
							countData.mobiles_visitors,
							countData.image_visitors
						],
						...getRandomColor(0.2, true, 4, 0.6),
						borderWidth: 3
					}
				]
			},
			options: {
				responsive: true,
				scales: {
					r: {
						beginAtZero: true
					},
					x: {
						display: true,
						beginAtZero: true,
						grid: {
							color: '#73737333'
						},
						ticks: {
							color: '#9b9b9b',
							font: { size: 15, family: 'consolas' }
						}
					},
					y: {
						display: true,
						beginAtZero: true,

						ticks: {
							display: true,
							color: '#9b9b9b',
							font: { size: 16, family: 'consolas' }
						},
						grid: {
							color: '#73737333'
						}
					}
				}
			}
		});
		countItemsChart = new Chart(countItemsChart, {
			type: 'line',
			data: {
				labels: countData.categories.map(e => e.category), 
				datasets: [
					{
						label: 'Device types',
						data: countData.categories.map(e => e.items),
						...chartDatasetOptions(),
						borderColor: function (context) {
							const chart = context.chart;
							const { ctx, chartArea } = chart;
							if (!chartArea) {
								return;
							}
							return getGradient(ctx, chartArea);
						}
					}
				]
			},
			...chartOptions('Number Of Items', true, { display: true })
		});
		dougChartOfCountItem = new Chart(dougChartOfCountItem, {
			type: 'doughnut',
			data: {
				labels: ['Phones & Watches', 'Computers'],
				datasets: [
					{
						label: 'Total categories',
						data: [countData.phones_category, countData.computers_category],
						...getRandomColor(0.3, true, 2),
						borderWidth: 1
					}
				]
			},
			...chartOptions('Number of categories', false, {})
		});
		// setInterval(updateChart, 1000);
	});
	onDestroy(() => {
		if (categoriesItemChart) categoriesItemChart.destroy();
		if (countItemsChart) countItemsChart.destroy();
		if (dougChartOfCountItem) dougChartOfCountItem.destroy();
		if (trendingChartElement) trendingChartElement.destroy();
		if (visitorsChartElement) visitorsChartElement.destroy();
	});
	let start_anim = false;
	onMount(() => {
		setTimeout(() => {
			start_anim = true;
		}, 500);
	});

	const firmCounts = alterNumberFormat(countData.firmwares);
	const phoneCatCounts = alterNumberFormat(countData.phones_category);
	const phoneCounts = alterNumberFormat(countData.phones);
	const computerCatCounts = alterNumberFormat(countData.computers_category);
	const computerCounts = alterNumberFormat(countData.computers);
	const firmCatCounts = alterNumberFormat(countData.cat_firmwares);
	const usersCounts = alterNumberFormat(countData.users);
	const blogsCounts = alterNumberFormat(countData.blogs);
</script>

<div>
	<div class="flex chart-2">
		<div class="flex k3992">
			<div class="dash-super count-element">
				<span class="dash-icon"><Icon src={CpuChip} /></span>
				<span class="x93">
					<CountAnim
						animationDuration={1000}
						targetCount={start_anim ? firmCounts.counts : 0}
					/>{firmCounts.postfix}
				</span>
				<span>Total Firmware</span>
			</div>
			<div class="dash-super count-element">
				<span class="dash-icon"><Icon src={DevicePhoneMobile} /></span>
				<span class="x93">
					<CountAnim
						animationDuration={2000}
						targetCount={start_anim ? phoneCounts.counts : 0}
					/>{phoneCounts.postfix}
				</span>
				<span> Number of phones </span>
			</div>
			<div class="dash-super count-element">
				<span class="dash-icon"><Icon src={ComputerDesktop} /></span>
				<span class="x93">
					<CountAnim
						targetCount={start_anim ? computerCounts.counts : 0}
						animationDuration={1500}
					/>{computerCounts.postfix}
				</span>
				<span> Number of Computers </span>
			</div>
			<div class="dash-super count-element">
				<span class="dash-icon"><Icon src={Users} /></span>
				<span class="x93">
					<CountAnim
						animationDuration={2500}
						targetCount={start_anim ? usersCounts.counts : 0}
					/>{usersCounts.postfix}
				</span>
				<span> Registered Users </span>
			</div>
		</div>

		<div class="wire" />

		<div class="flex as99932">
			<div class="dash-super a9932" style="width: 100%">
				<canvas bind:this={countItemsChart} />
			</div>

			<!-- <div class="dash-super a9932 without-bg">
				<canvas bind:this={dougChartOfCountItem} />
			</div> -->
		</div>
		<div class="flex k3992">
			<div class="dash-super count-element">
				<span class="dash-icon"><Icon src={RectangleStack} /></span>
				<span class="x93">
					<CountAnim
						animationDuration={2000}
						targetCount={start_anim ? phoneCatCounts.counts : 0}
					/>{phoneCatCounts.postfix}
				</span>
				<span> Phones Categories </span>
			</div>
			<div class="dash-super count-element">
				<span class="dash-icon"><Icon src={ServerStack} /></span>
				<span class="x93">
					<CountAnim
						animationDuration={1000}
						targetCount={start_anim ? computerCatCounts.counts : 0}
					/>{computerCatCounts.postfix}
				</span>
				<span> Computers Categories </span>
			</div>

			<div class="dash-super count-element">
				<span class="dash-icon"><Icon src={CircleStack} /></span>
				<span class="x93">
					<CountAnim
						animationDuration={2500}
						targetCount={start_anim ? firmCatCounts.counts : 0}
					/>{firmCatCounts.postfix}
				</span>
				<span> Firmware Categories </span>
			</div>
			<div class="dash-super count-element">
				<span class="dash-icon"><Icon src={Newspaper} /></span>
				<span class="x93">
					<CountAnim
						animationDuration={3000}
						targetCount={start_anim ? blogsCounts.counts : 0}
					/>{blogsCounts.postfix}
				</span>
				<span> Total Blogs </span>
			</div>
		</div>
	</div>

	<h2><span><Icon src={AdjustmentsHorizontal} /></span>Page's Visitors Analytics</h2>

	<div class="dash-super dash-element">
		<div class="dash-super count-element dash-side-33">
			<div class="xi003">
				<span class="dash-icon"><Icon src={ArrowTrendingUp} /></span>
				<span class="x93">
					{numberFormat(countData.home_visitors)}
				</span>
				<span class="a099cri2">Home page Visitors</span>
			</div>
			<div class="xi003">
				<span class="x93">
					{numberFormat(countData.blog_visitors)}
				</span>
				<span class="a099cri2">Blogs page Visitors</span>
			</div>
			<div class="xi003">
				<span class="x93">
					{numberFormat(countData.computer_visitors)}
				</span>
				<span class="a099cri2">Laptops page Visitors</span>
			</div>
			<div class="xi003">
				<span class="x93">
					{numberFormat(countData.firmwares_visitors)}
				</span>
				<span class="a099cri2">Firmwares page Visitors</span>
			</div>
			<div class="xi003">
				<span class="x93">
					{numberFormat(countData.mobiles_visitors)}
				</span>
				<span class="a099cri2">Mobiles page Visitors</span>
			</div>
			<div class="xi003">
				<span class="x93">
					{numberFormat(countData.image_visitors)}
				</span>
				<span class="a099cri2">Image Processing Page Visitors</span>
			</div>
		</div>
		<div class="si8323">
			<canvas bind:this={visitorsChartElement} />
		</div>
	</div>

	<h2 style="text-align:center"><span><Icon src={ChartBar} /></span> Trending Post's</h2>
	<div class="dash-super dash-element">
		<canvas bind:this={trendingChartElement} />
	</div>
	<h2 style="text-align:center">
		<span><Icon src={RectangleGroup} /></span> Mobile & Smart Watches Categories
	</h2>
	<div class="dash-super dash-element">
		<canvas bind:this={categoriesItemChart} />
	</div>
</div>

<style lang="scss">
	h2 {
		color: var(--primary-color);
		display: flex;
		align-items: center;
		justify-content: center;
		& span {
			margin: 0 10px;
		}
	}
	.si8323 {
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		max-height: 708px;
		margin-top: 68px;
	}
	.dash-side-33 {
		width: 200px !important;
		margin-top: -12px !important;
		border: none !important;
		background: none !important;
		box-shadow: none !important;
		& .xi003 {
			display: flex;
			flex-direction: column;
			margin: 2px auto;
			background: #0000ff26;
			padding: 19px 28px;
			border-radius: 12px;
			& .x93 {
				margin: 0;
			}
			& span.a099cri2 {
				font-size: 11px !important;
			}
		}
	}
	.dash-icon {
		background: var(--dash-element-icon-color);
		width: 43px;
		height: 43px;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		position: absolute;
		border: 1px solid var(--light-color-border-2);
		top: -19px;
		left: 0;
		right: 0;
		margin: auto;
	}
	.as99932 {
		width: 100%;
		justify-content: center;
		background: var(--charts-element-bg);
		padding: 18px 0;
		border-radius: 9px;
		& div {
			width: 25%;
		}
	}
	.without-bg {
		background: none !important;
		border: none !important;
		box-shadow: none !important;
	}
	.chart-2 {
		flex-wrap: wrap;
		& .k3992 {
			margin: 15px auto;
			flex-wrap: wrap;
			justify-content: center;
		}
	}
	.a9932 {
		margin: 6px 21px;
		align-items: flex-end;
		justify-content: center;
		border-radius: 25px;
		padding: 19px;
		min-height: 300px;
	}
	.count-element {
		color: var(--primary-color);
		width: 200px;
		padding: 33px 19px;
		margin: 13px 5px;
		font-weight: 500;
		flex-direction: column;
		text-align: center;
		& .x93 {
			font-size: 59px;
			font-weight: bold;
			margin: 17px 0 0 0;
		}
	}

	.dash-element {
		margin-top: 30px;
		padding: 10px;
	}
	.dash-super {
		cursor: pointer;
		position: relative;
		background: var(--charts-element-bg);
		border-radius: 14px;
		display: flex;
		font-size: 14px;
		box-shadow: var(--common-shadow);
		border: 1px solid var(--light-color-border-2);
	}
</style>
