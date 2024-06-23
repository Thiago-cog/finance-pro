import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Sector, ResponsiveContainer, Cell } from 'recharts';
import accountsServices from "../../services/accountsServices";
import authServices from "../../services/authServices";
import GetCookie from "../../hooks/getCookie";

function RevenueChart() {
	const [listRevenue, setListRevenue] = useState([]);
	const [activeIndex, setActiveIndex] = useState(0);
	const [radius, setRadius] = useState({ innerRadius: 40, outerRadius: 60, x: "13%" });
	const token = GetCookie("user_session");

	async function getTotalRevenue() {
		const decodeToken = await authServices.decodeToken(token);
		const userId = decodeToken.userToken.id;
		const response = await accountsServices.getTotalRevenueByUserId(token, userId);
		setListRevenue(response.data.revenues);
	}

	useEffect(() => {
		getTotalRevenue();
	}, []);

	useEffect(() => {
		function handleResize() {
			if (window.innerWidth < 640) {
				setRadius({ innerRadius: 50, outerRadius: 70, x: "50%" });
			} else {
				setRadius({ innerRadius: 60, outerRadius: 80, x: "13%" });
			}
		}

		window.addEventListener('resize', handleResize);
		handleResize();

		return () => window.removeEventListener('resize', handleResize);
	}, []);

	function generateColors(numColors) {
		const colors = [];
		const hueStart = 100;
		const hueIncrement = 35;
		for (let i = 0; i < numColors; i++) {
			const hue = hueStart + (i * hueIncrement);
			colors.push(`hsl(${hue}, 70%, 50%)`);
		}
		return colors;
	}
	const dynamicColors = generateColors(listRevenue.length);
	const data = listRevenue.map((item, index) => ({
		name: item.name_category,
		value: item.sum,
		color: dynamicColors[index % dynamicColors.length],
	}));

	const renderActiveShape = (props) => {
		const RADIAN = Math.PI / 180;
		const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props;
		const sin = Math.sin(-RADIAN * midAngle);
		const cos = Math.cos(-RADIAN * midAngle);
		const sx = cx + (outerRadius + 10) * cos;
		const sy = cy + (outerRadius + 10) * sin;
		const mx = cx + (outerRadius + 30) * cos;
		const my = cy + (outerRadius + 30) * sin;
		const ex = mx + (cos >= 0 ? 1 : -1) * 11;
		const ey = my;
		const textAnchor = cos >= 0 ? 'start' : 'end';

		return (
			<g>
				<text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
					{payload.name}
				</text>
				<Sector
					cx={cx}
					cy={cy}
					innerRadius={innerRadius}
					outerRadius={outerRadius}
					startAngle={startAngle}
					endAngle={endAngle}
					fill={fill}
				/>
				<Sector
					cx={cx}
					cy={cy}
					startAngle={startAngle}
					endAngle={endAngle}
					innerRadius={outerRadius + 6}
					outerRadius={outerRadius + 10}
					fill={fill}
				/>
				<path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
				<circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
				<text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">{`R$ ${value}`}</text>
				<text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
					{`(${(percent * 100).toFixed(2)}%)`}
				</text>
			</g>
		);
	};

	const onPieEnter = (_, index) => {
		setActiveIndex(index);
	};

	return (
		<>
			{data && data.length > 0 ? (
				<ResponsiveContainer width="100%" height={260}>
					<PieChart className="rounded-lg h-full w-full lg:w-1/2 bg-white">
						<text x={radius.x} y="30" textAnchor="middle" dominantBaseline="middle" fontSize="16">
							Total de receitas
						</text>
						<Pie
							activeIndex={activeIndex}
							activeShape={renderActiveShape}
							data={data}
							cx="50%"
							cy="60%"
							innerRadius={radius.innerRadius}
							outerRadius={radius.outerRadius}
							fill="#8884d8"
							dataKey="value"
							onMouseEnter={onPieEnter}
						>
							{data.map((entry, index) => (
								<Cell key={`cell-${index}`} fill={entry.color} />
							))}
						</Pie>
					</PieChart>
				</ResponsiveContainer>
			) : (
				<div className='rounded-lg w-full h-full bg-white flex justify-center items-center text-xl'>
					<h1>Nenhum dado encontrado</h1>
				</div>
			)}
		</>
	);
}

export default RevenueChart;
