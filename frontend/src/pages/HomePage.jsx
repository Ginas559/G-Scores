import { useEffect, useState } from "react";
import { Input, Button } from "antd";
import { getStudentBySbd } from "../api/studentApi";
import { getReport } from "../api/reportApi";
const HomePage = () => {
    const [sbd, setSbd] = useState("");
    const [student, setStudent] = useState(null);
    const [report, setReport] = useState(null);
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
                    <p>Registration Number: {student.sbd}</p>
                    <p>Math: {student.toan}</p>
                    <p>Literature: {student.ngu_van}</p>
                    <p>Foreign Language: {student.ngoai_ngu}</p>
                    <p>Physics: {student.vat_li}</p>
                    <p>Chemistry: {student.hoa_hoc}</p>
                    <p>Biology: {student.sinh_hoc}</p>
                    <p>History: {student.lich_su}</p>
                    <p>Geography: {student.dia_li}</p>
                    <p>Civic Education: {student.gdcd}</p>
                    <p>Foreign Language Code: {student.ma_ngoai_ngu}</p>
                </div>
            )}
            {report && (
                <div>
                    <h2>Score Statistics</h2>
                    {
                        Object.keys(report).map((subject) => {
                            console.log(report[subject]);
                            return (
                                <div key={subject}>
                                    <h3>{subject}</h3>
                                    <p>{">=8"}: {report[subject][">=8"]}</p>
                                    <p>6-8: {report[subject]["6-8"]}</p>
                                    <p>4-6: {report[subject]["4-6"]}</p>
                                    <p>{"<4"}: {report[subject]["<4"]}</p>

                                </div>
                            );
                        })

                    }
                </div>
            )}
        </div>
    );
};
export default HomePage;