import { useEffect, useState } from "react";
import { Input, Button, Card, Row, Col } from "antd";
import { getStudentBySbd } from "../api/studentApi";
import { getReport } from "../api/reportApi";
const HomePage = () => {
    const [sbd, setSbd] = useState("");
    const [student, setStudent] = useState(null);
    const [report, setReport] = useState(null);
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
    useEffect(() => {
        fetchReport();
    }, []);
    return (
        <div>
            <h1>G-Scores</h1>
            <Input
                placeholder="Enter registration number"
                value={sbd}
                onChange={(e) => setSbd(e.target.value)}
            />
            <Button
                type="primary"
                onClick={findStudent}
            >
                Search
            </Button>
            {student && (
                <div>
                    <p>Số báo danh: {student.sbd}</p>
                    <p>Toán: {student.toan}</p>
                    <p>Ngữ văn: {student.ngu_van}</p>
                    <p>Ngoại ngữ: {student.ngoai_ngu}</p>
                    <p>Vật lý: {student.vat_li}</p>
                    <p>Hóa học: {student.hoa_hoc}</p>
                    <p>Sinh học: {student.sinh_hoc}</p>
                    <p>Lịch sử: {student.lich_su}</p>
                    <p>Địa lý: {student.dia_li}</p>
                    <p>Giáo dục công dân: {student.gdcd}</p>
                    <p>Mã ngoại ngữ: {student.ma_ngoai_ngu}</p>
                </div>
            )}
            {report && (
                <div>
                    <h2>Score Statistics</h2>
                    {
                        <Row gutter={[16, 16]}>
                            {
                                Object.keys(report).map((subject) => {
                                    console.log(report[subject]);
                                    return (
                                        <Col
                                            key={subject}
                                            span={8}
                                        >
                                            <Card
                                                title={subjectNames[subject]}
                                            >
                                                <p>{">=8"}: {report[subject][">=8"]}</p>
                                                <p>6-8: {report[subject]["6-8"]}</p>
                                                <p>4-6: {report[subject]["4-6"]}</p>
                                                <p>{"<4"}: {report[subject]["<4"]}</p>
                                            </Card>
                                        </Col>
                                    );
                                })
                            }
                        </Row>
                    }
                </div>
            )}
        </div>
    );
};
export default HomePage;