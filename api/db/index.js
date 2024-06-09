const sql = require('mssql/msnodesqlv8');


const config = {
    database: 'HomeworkJune5_BillShare',
    server: '.\\sqlexpress',
    driver: 'msnodesqlv8',
    options: {
        trustServerCertificate: true,
        trustedConnection: true
    }
}

const getParticipants = async () => {
    await sql.connect(config);

    const { recordset } = await sql.query`select * from participants`;

    await sql.close();

    return recordset;
}

const addPerson = async person => {
    await sql.connect(config);

    const {name, email} = person;
    await sql.query`insert into participants
                    values (${name}, ${email})`;

    await sql.close();
}

const addBill = async ({amount, participantIds}) => {
    await sql.connect(config);

    let query = `insert into Bills
                values (${amount}, getdate())
                declare @billid int = scope_identity()`;

    participantIds.map(i => {
        query += ` \ninsert into ParticipantsBills
                   values (@billid, ${i}, ${amount / participantIds.length})`
    });

    await sql.query(query);

    await sql.close();
}

const getBills = async () => {
    await sql.connect(config);

    const {recordset} = await sql.query`select b.*, count(pb.BillID) as ParticipantCount from Bills b 
                    join ParticipantsBills pb on b.ID = pb.BillID
                    group by b.ID, b.TotalAmount, b.Date`;

    await sql.close();

    return recordset;
}

const getBillDetails = async id => {
    await sql.connect(config);

    const {recordset} = await sql.query`select b.ID, b.Date, b.TotalAmount, p.Name, pb.Amount from Bills b
                    join ParticipantsBills pb on b.ID = pb.BillID
                    join Participants p on p.ID = pb.ParticipantID
                    where b.ID = ${id}`;

    await sql.close();

    return recordset;
}

module.exports = { getParticipants, addPerson, addBill, getBills, getBillDetails };
