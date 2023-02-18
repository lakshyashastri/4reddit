import React, {useState, useEffect} from "react";
import {useParams} from "react-router-dom";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";

import "chart.js/auto";
import {Line, Pie} from "react-chartjs-2";

import FourBar from "../../components/FourBar";
import {getFrom, postTo} from "../../helpers";
import Loading from "../../components/Loading";

const Data = [
    {
        id: 1,
        year: 2016,
        userGain: 80000,
        userLost: 823
    },
    {
        id: 2,
        year: 2017,
        userGain: 45677,
        userLost: 345
    },
    {
        id: 3,
        year: 2018,
        userGain: 78888,
        userLost: 555
    },
    {
        id: 4,
        year: 2019,
        userGain: 90000,
        userLost: 4555
    },
    {
        id: 5,
        year: 2020,
        userGain: 4300,
        userLost: 234
    }
];

const templateChartData = {
    labels: Data.map(data => data.year),
    datasets: [
        {
            label: "Users Gained ",
            data: Data.map(data => data.userGain),
            backgroundColor: [
                "rgba(75,192,192,1)",
                "#ecf0f1",
                "#50AF95",
                "#f3ba2f",
                "#2a71d0"
            ],
            borderColor: "black",
            borderWidth: 3
        }
    ]
};

function DailyVisitors(props) {
    const [chartData, setChartData] = useState(null);

    useEffect(() => {
        (async () => {
            let res = await getFrom(
                `/boardits/${props.boarditName}/prop/stats`
            );

            let labels = [];
            let data = [];
            for (let day in res) {
                if (day == "_id") {
                    continue;
                }
                labels.push(day);
                data.push(res[day].visits.length);
            }

            setChartData({
                labels,
                datasets: [
                    {
                        labels,
                        data,
                        backgroundColor: ["rgba(75,192,192,1)", "#ecf0f1"],
                        borderColor: "black",
                        borderWidth: 3
                    }
                ]
            });
        })();
    }, []);

    return chartData ? (
        <div className="chart-container">
            <Typography align="center" variant="h4">
                {props.heading}
            </Typography>

            <Typography align="center" variant="h6" gutterBottom>
                Visitors today:
            </Typography>
            <Line
                data={chartData}
                options={{
                    plugins: {
                        legend: {
                            display: false
                        }
                    },
                    scales: {
                        x: {
                            title: {
                                display: true,
                                text: "Date",
                                color: "black"
                            },
                            ticks: {
                                color: "black"
                            }
                        },
                        y: {
                            title: {
                                display: true,
                                text: "Number of unique visitors",
                                color: "black"
                            },
                            ticks: {
                                color: "black"
                            }
                        }
                    }
                }}
            />
        </div>
    ) : (
        <Loading />
    );
}

function ReportedDeletedPosts(props) {
    const [chartData, setChartData] = useState(null);
    const [totalReported, setTotalReported] = useState(null);

    const labels = [
        "Reported and deleted posts",
        "Reported but not deleted posts"
    ];

    useEffect(() => {
        (async () => {
            let data = await getFrom(`/boardits/${props.boarditName}`);
            let {reportedPosts, deletedPosts} = data[0];
            setTotalReported(reportedPosts);

            setChartData({
                labels,
                datasets: [
                    {
                        labels,
                        data: [deletedPosts, reportedPosts - deletedPosts],
                        backgroundColor: ["rgba(75,192,192,1)", "#ecf0f1"],
                        borderColor: "black",
                        borderWidth: 3
                    }
                ]
            });
        })();
    }, []);

    return chartData ? (
        <div className="chart-container">
            <Typography align="center" variant="h4">
                {props.heading}
            </Typography>
            {totalReported ? (
                <React.Fragment>
                    <Typography align="center" variant="h6" gutterBottom>
                        Total reported posts: {totalReported}
                    </Typography>

                    <Pie
                        data={chartData}
                        options={{
                            plugins: {
                                legend: {
                                    labels: {
                                        color: "black"
                                    }
                                }
                            }
                        }}
                    />
                </React.Fragment>
            ) : (
                <Typography align="center">No reported posts yet</Typography>
            )}
        </div>
    ) : (
        <Loading />
    );
}

function StatGrid(props) {
    return (
        <Grid container spacing={3} justify="center">
            <Grid item xs={6} md={6}>
                <Typography variant="h6" align="center">
                    Member Growth Over Time
                </Typography>
            </Grid>
            <Grid item xs={6} md={6}>
                <Typography variant="h6" align="center">
                    Daily Posts Count
                </Typography>
            </Grid>
            <Grid item xs={6} md={6}>
                <DailyVisitors
                    heading="Daily Visitor Count"
                    boarditName={props.boarditName}
                />
            </Grid>
            <Grid item xs={6} md={6}>
                <ReportedDeletedPosts
                    heading={"Reported vs Deleted Posts"}
                    boarditName={props.boarditName}
                />
            </Grid>
        </Grid>
    );
}

export default function StatsPage(props) {
    const {boarditName} = useParams();

    return (
        <React.Fragment>
            <FourBar boarditName={boarditName} />
            <Grid marginTop={"15vh"}>
                <StatGrid boarditName={boarditName} />
            </Grid>
        </React.Fragment>
    );
}
