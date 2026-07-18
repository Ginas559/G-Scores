import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { useEffect, useState } from "react";
import { Input, Button, Card, Row, Col, Table, Descriptions } from "antd";
import { Space } from "antd";
import { message } from "antd";
import { getStudentBySbd } from "../api/studentApi";
import { getReport } from "../api/reportApi";
import { getTop10GroupA } from "../api/top10Api";

const subjectName = {
    toan: "Toán",
    ngu_van: "Ngữ Văn",
    ngoai_ngu: "Ngoại ngữ",
    vat_li: "Vật lý",
    hoa_hoc: "Hóa học",
    sinh_hoc: "Sinh học",
    lich_su: "Lịch sử",
    dia_li: "Địa lý",
    gdcd: "Giáo dục công dân",
};

const top10GrA = [
    {
        title: "Xếp hạng",
        key: "rank",
        render: (text, record, index) => index + 1,
    },
    {
        title: "Số báo danh",
        dataIndex: "sbd",
        key: "sbd",
        align: "center",
    },
    {
        title: "Toán",
        dataIndex: "toan",
        key: "toan",
        align: "center",
    },
    {
        title: "Vật lý",
        dataIndex: "vat_li",
        key: "vat_li",
        align: "center",
    },
    {
        title: "Hóa học",
        dataIndex: "hoa_hoc",
        key: "hoa_hoc",
        align: "center",
    },
    {
        title: "Tổng điểm",
        dataIndex: "tong_diem",
        key: "tong_diem",
        align: "center",
        render: (value) => value.toFixed(2),
    },
];

const getScore = (score) => {
    return score == null ? text.noScore : score;
};

const text = {
    title: "G-Scores",
    searchPlaceholder: "Enter registration number",
    searchButton: "Search",
    studentInfo: "Thông tin thí sinh",
    registrationNumber: "Số báo danh",
    track: "Khối",
    math: "Toán",
    literature: "Ngữ văn",
    foreignLanguage: "Ngoại ngữ",
    physics: "Vật lý",
    history: "Lịch sử",
    chemistry: "Hóa học",
    geography: "Địa lý",
    biology: "Sinh học",
    civicEducation: "GDCD",
    scoreStatistics: "Score Statistics",
    topA: "Top 10 Khối A",
    natural: "Tự nhiên",
    social: "Xã hội",
    noData: "Không có",
    noScore: "Không có điểm",
};

const HomePage = () => {
    const [sbd, setSbd] = useState("");
    const [student, setStudent] = useState(null);
    const [report, setReport] = useState(null);
    const [top10, setTop10] = useState([]);
    const natural =
        student &&
        (student.vat_li != null ||
            student.hoa_hoc != null ||
            student.sinh_hoc != null);
    const findStudent = () => {
        if (!/^\d{8}$/.test(sbd.trim())) {
            message.warning("Số báo danh phải gồm đúng 8 chữ số");
            return;
        }
        getStudentBySbd(sbd)
            .then((response) => {
                setStudent(response.data);
            })
            .catch((err) => {
                setStudent(null);
                message.error("Không tìm thấy thí sinh");
            });
    };
    const loadReportData = () => {
        getReport()
            .then((response) => {
                setReport(response.data);
            })
            .catch(() => {});
    };
    const loadTop10 = () => {
        getTop10GroupA()
            .then((response) => {
                setTop10(response.data);
            })
            .catch(() => {});
    };
    useEffect(() => {
        loadReportData();
        loadTop10();
    }, []);
    return (
        <div style={{ padding: 24 }}>
            <h1>{text.title}</h1>
            <Space>
                <Input
                    style={{ width: 300 }}
                    placeholder={text.searchPlaceholder}
                    value={sbd}
                    onChange={(e) => setSbd(e.target.value)}
                    onPressEnter={findStudent}
                />
                <Button
                    type="primary"
                    onClick={findStudent}
                >
                    {text.searchButton}
                </Button>
            </Space>
            <div style={{ marginTop: 24 }}></div>
            {student && (
                <Card title={text.studentInfo}>
                    <Descriptions bordered column={2}>
                        <Descriptions.Item label={text.registrationNumber}>
                            {student.sbd}
                        </Descriptions.Item>

                        <Descriptions.Item label={text.track}>
                            {natural ? text.natural : text.social}
                        </Descriptions.Item>

                        <Descriptions.Item label={text.math}>
                            {getScore(student.toan)}
                        </Descriptions.Item>

                        <Descriptions.Item label={natural ? "Vật lý" : "Lịch sử"}>
                            {getScore(natural ? student.vat_li : student.lich_su)}
                        </Descriptions.Item>

                        <Descriptions.Item label={text.literature}>
                            {getScore(student.ngu_van)}
                        </Descriptions.Item>

                        <Descriptions.Item label={natural ? "Hóa học" : "Địa lý"}>
                            {getScore(natural ? student.hoa_hoc : student.dia_li)}
                        </Descriptions.Item>

                        <Descriptions.Item label={text.foreignLanguage}>
                            {getScore(student.ngoai_ngu)}
                        </Descriptions.Item>

                        <Descriptions.Item label={natural ? "Sinh học" : "GDCD"}>
                            {getScore(natural ? student.sinh_hoc : student.gdcd)}
                        </Descriptions.Item>

                        <Descriptions.Item label="Mã ngoại ngữ" span={2}>
                            {student.ma_ngoai_ngu ?? text.noData}
                        </Descriptions.Item>
                    </Descriptions>
                </Card>
            )
            }
            {
                report && (
                    <div>
                        <h2>{text.scoreStatistics}</h2>
                        {
                            <Row gutter={[16, 16]}>
                                {
                                    Object.keys(report).map((subject) => {
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
                                                    title={subjectName[subject]}
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
                        <Card title={text.topA}>
                            <Table
                                columns={top10GrA}
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