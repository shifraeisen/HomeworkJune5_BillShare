import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { formatCurrency, formatDate } from "../formatters";
import { FaUser } from 'react-icons/fa';

const BillDetails = () => {

    const { id } = useParams();

    useEffect(() => {
        const getBillDetails = async () => {
            const { data } = await axios.get(`/api/bills/getdetails?id=${id}`);
            setDetails(getCleanDetails(data));
            setIsLoading(false);
        };
        getBillDetails();
    }, []);

    const [details, setDetails] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const getCleanDetails = details => {
        console.log(details);
        const data = { id, totalAmount: details[0].totalAmount, participants: [] };
        details.forEach(d => data.participants.push({ name: d.name, amount: d.amount }));
        data.participants.map(p => console.log(p));
        return data;
    }

    const { date, totalAmount, participants } = details;

    if (isLoading) {
        return (
            <div className="container d-flex justify-content-center align-items-center" style={{ marginTop: 80 }}>
                <img src='/src/loadingimage/Disk@1x-1.0s-200px-200px.gif' />
            </div>
        )
    }

    return (
        <>
            <div className="container" style={{ marginTop: 80 }}>
                <div className="container mt-5 d-flex justify-content-center">
                    <div className="card shadow-lg" style={{ width: '100vh', maxWidth: 600 }}>
                        <div className="card-header bg-dark text-white">
                            <h2 className="card-title text-center mb-0">Bill Details</h2>
                        </div>
                        <div className="card-body">
                            <p>
                                <strong>Date:</strong> {formatDate(details.date)}
                            </p>
                            <p>
                                <strong>Total Amount:</strong> {formatCurrency(details.totalAmount)}
                            </p>
                            <h3 className="mt-4">Participants</h3>
                            <ul className="list-group">
                                {details.participants.map(p =>
                                    <li key={p.name} className="list-group-item d-flex justify-content-between align-items-center">
                                        <span>
                                            <FaUser className="me-2" /> {p.name}
                                        </span>
                                        <span className="badge bg-success rounded-pill">
                                            {formatCurrency(p.amount)}
                                        </span>
                                    </li>
                                )}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default BillDetails;