import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { useEffect, useState } from "react";
import { Input, Button, Card, Row, Col, Table, Descriptions } from "antd";
import { Space } from "antd";
import { getStudentBySbd } from "../api/studentApi";
import { getReport } from "../api/reportApi";
import { getTop10GroupA } from "../api/top10Api";
const HomePage = () => {
    const [sbd, setSbd] = useState("");
    const [student, setStudent] = useState(null);
    const [report, setReport] = useState(null);
    const [top10, setTop10] = useState([]);
    const subjectNames = {
        toan: "Toán",
        ngu_van: "Ngữ Văn",
        ngoai_ngu: "Ngoại ngữ",
        vat_li: "Vật lý",
        hoa_hoc: "Hóa học",
        sinh_hoc: "Sinh học",
        lich_su: "Lịch sử",
        dia_li: "Địa lý",
        gdcd: "Giáo dục công dân"
    };
    const columns = [
        {
            title: "Xếp hạng",
            key: "rank",
            render: (text, record, index) => {
                return index + 1;
            }
        },
        {
            title: "Số báo danh",
            dataIndex: "sbd",
            key: "sbd",
            align: "center"
        },
        {
            title: "Toán",
            dataIndex: "toan",
            key: "toan",
            align: "center"
        },
        {
            title: "Vật lý",
            dataIndex: "vat_li",
            key: "vat_li",
            align: "center"
        },
        {
            title: "Hóa học",
            dataIndex: "hoa_hoc",
            key: "hoa_hoc",
            align: "center"
        },
        {
            title: "Tổng điểm",
            dataIndex: "tong_diem",
            key: "tong_diem",
            align: "center",
            render: (value) => value.toFixed(2)
        },
    ];
    const displayScore = (score) => {
        return score == null ? "Không có điểm" : score;
    };
    const requiredSubjects = [
        { label: "Toán", key: "toan" },
        { label: "Ngữ văn", key: "ngu_van" },
        { label: "Ngoại ngữ", key: "ngoai_ngu" }
    ];
    const naturalSubjects = [
        { label: "Vật lý", key: "vat_li" },
        { label: "Hóa học", key: "hoa_hoc" },
        { label: "Sinh học", key: "sinh_hoc" }
    ];
    const socialSubjects = [
        { label: "Lịch sử", key: "lich_su" },
        { label: "Địa lý", key: "dia_li" },
        { label: "Giáo dục công dân", key: "gdcd" }
    ];
    const hasNatural =
        student &&
        (student.vat_li != null ||
            student.hoa_hoc != null ||
            student.sinh_hoc != null);
    const hasSocial =
        student &&
        (student.lich_su != null ||
            student.dia_li != null ||
            student.gdcd != null);
    const findStudent = () => {
        getStudentBySbd(sbd)
            .then((response) => {
                console.log(response.data);
                setStudent(response.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    const fetchReport = () => {
        getReport()
            .then((response) => {
                console.log(response.data);
                setReport(response.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    const fetchTop10 = () => {
        getTop10GroupA()
            .then((response) => {
                console.log(response.data);
                setTop10(response.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    useEffect(() => {
        fetchReport();
        fetchTop10();
    }, []);
    return (
        <div style={{ padding: 24 }}>
            <h1>G-Scores</h1>
            <Space>
                <Input
                    style={{ width: 300 }}
                    placeholder="Enter registration number"
                    value={sbd}
                    onChange={(e) => setSbd(e.target.value)}
                    onPressEnter={findStudent}
                />
                <Button
                    type="primary"
                    onClick={findStudent}
                >
                    Search
                </Button>
            </Space>
            <div style={{ marginTop: 24 }}></div>
            {student && (
                <Card title="Thông tin thí sinh">
                    <Descriptions bordered column={2}>
                        <Descriptions.Item label="Số báo danh">
                            {student.sbd}
                        </Descriptions.Item>

                        <Descriptions.Item label="Khối">
                            {hasNatural ? "Tự nhiên" : "Xã hội"}
                        </Descriptions.Item>

                        <Descriptions.Item label="Toán">
                            {displayScore(student.toan)}
                        </Descriptions.Item>

                        <Descriptions.Item
                            label={hasNatural ? "Vật lý" : "Lịch sử"}
                        >
                            {displayScore(
                                hasNatural ? student.vat_li : student.lich_su
                            )}
                        </Descriptions.Item>

                        <Descriptions.Item label="Ngữ văn">
                            {displayScore(student.ngu_van)}
                        </Descriptions.Item>

                        <Descriptions.Item
                            label={hasNatural ? "Hóa học" : "Địa lý"}
                        >
                            {displayScore(
                                hasNatural ? student.hoa_hoc : student.dia_li
                            )}
                        </Descriptions.Item>

                        <Descriptions.Item label="Ngoại ngữ">
                            {displayScore(student.ngoai_ngu)}
                        </Descriptions.Item>

                        <Descriptions.Item
                            label={hasNatural ? "Sinh học" : "GDCD"}
                        >
                            {displayScore(
                                hasNatural ? student.sinh_hoc : student.gdcd
                            )}
                        </Descriptions.Item>

                        <Descriptions.Item label="Mã ngoại ngữ" span={2}>
                            {student.ma_ngoai_ngu ?? "Không có"}
                        </Descriptions.Item>
                    </Descriptions>
                </Card>
            )
            }
            {
                report && (
                    <div>
                        <h2>Score Statistics</h2>
                        {
                            <Row gutter={[16, 16]}>
                                {
                                    Object.keys(report).map((subject) => {
                                        console.log(report[subject]);
                                        const chartData = [
                                            {
                                                level: "<4",
                                                count: report[subject]["<4"]
                                            },
                                            {
                                                level: "4-6",
                                                count: report[subject]["4-6"]
                                            },
                                            {
                                                level: "6-8",
                                                count: report[subject]["6-8"]
                                            },
                                            {
                                                level: ">=8",
                                                count: report[subject][">=8"]
                                            }
                                        ];
                                        return (
                                            <Col
                                                key={subject}
                                                span={8}
                                            >
                                                <Card
                                                    title={subjectNames[subject]}
                                                >
                                                    <ResponsiveContainer
                                                        width="100%"
                                                        height={250}
                                                    >
                                                        <BarChart
                                                            data={chartData}
                                                        >
                                                            <XAxis dataKey="level" />
                                                            <YAxis />
                                                            <Tooltip />
                                                            <Bar
                                                                dataKey="count"
                                                                fill="#1677ff"
                                                            />
                                                        </BarChart>
                                                    </ResponsiveContainer>
                                                </Card>
                                            </Col>
                                        );
                                    })
                                }
                            </Row>
                        }
                        <div style={{ marginTop: 24 }} />
                        <Card title="Top 10 Khối A">
                            <Table
                                columns={columns}
                                dataSource={top10}
                                rowKey="sbd"
                                pagination={false}
                            />
                        </Card>
                    </div>
                )
            }
        </div >
    );
};
export default HomePage;