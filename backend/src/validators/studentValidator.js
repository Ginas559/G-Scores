const validateStudentSbd = (req, res, next) => {
    const { sbd } = req.params;
    if (!/^\d{8}$/.test(sbd)) {
        return res.status(400).json({
            message: "Số báo danh phải gồm đúng 8 chữ số"
        });
    }
    next();
};
module.exports = {
    validateStudentSbd,
};