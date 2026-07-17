const fs = require("fs");
const path = require("path");
const csv = require("csv-parser");

const sequelize = require("../config/database");
const Student = require("../models/Student");

const students = [];

const csvPath = path.join(
    __dirname,
    "../../dataset/diem_thi_thpt_2024.csv"
);

fs.createReadStream(csvPath)
    .pipe(csv())
    .on("data", (row) => {
        students.push({
            sbd: row.sbd,

            toan: row.toan || null,

            ngu_van: row.ngu_van || null,

            ngoai_ngu: row.ngoai_ngu || null,

            vat_li: row.vat_li || null,

            hoa_hoc: row.hoa_hoc || null,

            sinh_hoc: row.sinh_hoc || null,

            lich_su: row.lich_su || null,

            dia_li: row.dia_li || null,

            gdcd: row.gdcd || null,

            ma_ngoai_ngu: row.ma_ngoai_ngu || null,
        });
    })

    .on("end", () => {

        sequelize
            .authenticate()

            .then(async () => {

                console.log("Database connected.");

                const batchSize = 1000;

                for (let i = 0; i < students.length; i += batchSize) {

                    const batch = students.slice(i, i + batchSize);

                    await Student.bulkCreate(batch);

                    console.log(
                        `Imported ${Math.min(i + batch.length, students.length)}/${students.length}`
                    );
                }

            })

            .then(() => {

                console.log("Import completed.");

            })
            .finally(() => {

                process.exit();

            });

            .catch ((err) => {

            console.log(err);

        });

    });