import { useState } from "react";
import { Input, Button } from "antd";
import { getStudentBySbd } from "../api/studentApi";
const HomePage = () => {
    const [sbd, setSbd] = useState("");
    const [student, setStudent] = useState(null);
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
        </div>
    );
};
export default HomePage;