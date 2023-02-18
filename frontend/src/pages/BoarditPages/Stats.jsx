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

function MemberGrowth(props) {
    const [chartData, setChartData] = useState(null);

    useEffect(() => {
        (async () => {
            let res = await getFrom(
                `/boardits/${props.boarditName}/prop/stats`
            );

            let labels = [];
            let data = [];
            for (let day in res) {
                labels.push(day);
                data.push(res[day].membersJoined);
            }

            console.log(data);

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
                Number of members who joined today:{" "}
                {chartData.datasets[0].data.slice(-1)[0]}
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
                                text: "Number of posts",
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

function DailyPosts(props) {
    const [chartData, setChartData] = useState(null);

    useEffect(() => {
        (async () => {
            let res = await getFrom(
                `/boardits/${props.boarditName}/prop/stats`
            );

            let labels = [];
            let data = [];
            for (let day in res) {
                labels.push(day);
                data.push(res[day].posts);
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
                Posts today: {chartData.datasets[0].data.slice(-1)[0]}
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
                                text: "Number of posts",
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
                Visitors today: {chartData.datasets[0].data.slice(-1)[0]}
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
        <Grid
            container
            spacing={3}
            justify="center"
            style={{border: "1px solid black"}}
        >
            <Grid item xs={6} md={3} style={{border: "1px solid black"}}>
                <MemberGrowth
                    heading="Member Growth Over Time"
                    boarditName={props.boarditName}
                />
            </Grid>
            <Grid item xs={6} md={3} style={{border: "1px solid black"}}>
                <DailyPosts
                    heading="Daily Posts Count"
                    boarditName={props.boarditName}
                />
            </Grid>
            <Grid item xs={6} md={3} style={{border: "1px solid black"}}>
                <DailyVisitors
                    heading="Daily Visitor Count"
                    boarditName={props.boarditName}
                />
            </Grid>
            <Grid item xs={6} md={3} style={{border: "1px solid black"}}>
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
            <Typography variant="h2" align="center" marginTop={2}>
                Boardit statistics
            </Typography>
            <Typography align="center" variant="h4" gutterBottom>
                r/{boarditName}
            </Typography>
            <Grid marginTop={"5vh"}>
                <StatGrid boarditName={boarditName} />
            </Grid>
        </React.Fragment>
    );
}
