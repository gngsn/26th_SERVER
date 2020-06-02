const user = {
    updateProfile: async (name, email, phone, profile, userIdx) => {
        const fields = ['name', 'email', 'phone', 'profile'];
        const values = [name, email, phone, profile];
        await pool.Transaction(async (connection) => {
            for (i in fields) {
                if (values[i] !== undefined && values[i] !== '') {
                    const query = `UPDATE ${table} SET ${fields[i]}="${values[i]}" WHERE userIdx=${userIdx}`;
                    await connection.query(query);
                }
            }
        }).catch(err => {
            console.log(err);
            throw err;
        });
        const query = `SELECT name, email, phone, profile FROM ${table} WHERE userIdx = ${userIdx}`;
        return pool.queryParam_None(query);
    }
}

module.exports = user;