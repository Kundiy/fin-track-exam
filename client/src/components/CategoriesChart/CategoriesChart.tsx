import {Cell, Pie, PieChart, ResponsiveContainer, Sector, Text as RechartsText} from 'recharts';
import {useAppDispatch, useAppSelector} from "../../store/hooks.ts";
import {useEffect, useState} from "react";
import {getCategoriesByType} from "../../store/category/categorySlice.ts";
import {EXPENSE_CATEGORY_ID, INCOME_CATEGORY_ID} from "../../constants/categoryTypes.ts";
import {TEXT} from "../../constants/textConstants.ts";

type Value = {
    name: string;
    value: number;
}

const colors = ['#8884d8', '#83a6ed', '#8dd1e1', '#82ca9d', '#a4de6c', 'url(#pattern-checkers)'];

const renderActiveShape = (props: any) => {
    const RADIAN = Math.PI / 180;
    const {cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value} = props;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 15) * cos;
    const my = cy + (outerRadius + 25) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? 'start' : 'end';

    return (
        <g>
            <RechartsText x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}
                          style={{fontSize: '18px', fontWeight: 'bold'}}>
                {payload.name}
            </RechartsText>
            <Sector
                cx={cx}
                cy={cy}
                innerRadius={innerRadius}
                outerRadius={outerRadius + 6}
                startAngle={startAngle}
                endAngle={endAngle}
                fill={fill}
            />
            <Sector
                cx={cx}
                cy={cy}
                startAngle={startAngle}
                endAngle={endAngle}
                innerRadius={outerRadius + 8}
                outerRadius={outerRadius + 10}
                fill={fill}
            />
            <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none"/>
            <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none"/>

            <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333"
                  style={{fontSize: '12px', fontWeight: 'bold'}}>
                {`${value.toFixed(2)}`}
            </text>
            <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999"
                  style={{fontSize: '11px'}}>
                {`(${(percent * 100).toFixed(2)}%)`}
            </text>
        </g>
    );
};

export default function CategoriesChart({isAnimationActive = true}: { isAnimationActive?: boolean }) {
    const dispatch = useAppDispatch();
    const [activeIndex, setActiveIndex] = useState(0);
    const [categoryType, setCategoryType] = useState(EXPENSE_CATEGORY_ID);

    const currentCategories = useAppSelector(state => state.categories.categories);
    const categories: Value[] = currentCategories.map(category => ({
        name: category.name,
        value: Number(Number(category.amount).toFixed(2))
    }));

    const handleClick = () => {
        setCategoryType(prevId =>
            prevId === EXPENSE_CATEGORY_ID ? INCOME_CATEGORY_ID : EXPENSE_CATEGORY_ID
        );
    }

    useEffect(() => {
        dispatch(getCategoriesByType(categoryType));
    }, [dispatch, categoryType]);

    const onPieEnter = (_: any, index: number) => {
        setActiveIndex(index);
    };

    if (categories.length === 0) return null;

    return (
        <>
            {categoryType === EXPENSE_CATEGORY_ID
                ? <p style={{fontSize: "20px"}}>{TEXT.PAGES_TEXTS.CATEGORY_EXPENSES_CHART_TITLE}</p>
                : <p style={{fontSize: "20px"}}>{TEXT.PAGES_TEXTS.CATEGORY_INCOME_CHART_TITLE}</p>}
            <ResponsiveContainer width="100%" height={300} >
                <PieChart onClick={handleClick} className={'chart-wrapper'}>
                    <Pie
                        activeIndex={activeIndex}
                        activeShape={renderActiveShape}
                        data={categories}
                        innerRadius="40%"
                        outerRadius="60%"
                        cornerRadius="30%"
                        fill="#8884d8"
                        paddingAngle={3}
                        dataKey="value"
                        onMouseEnter={onPieEnter}
                        isAnimationActive={isAnimationActive}
                        animationDuration={500}
                        animationBegin={0}

                    >
                        {categories.map((_entry, index) => (
                            <Cell key={`cell-${index}`} fill={colors[index]}/>
                        ))}
                    </Pie>
                </PieChart>
            </ResponsiveContainer>
        </>
    );
}