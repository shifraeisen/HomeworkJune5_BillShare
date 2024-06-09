import { useEffect, useState } from "react";
import axios from 'axios';
import {Link} from 'react-router-dom';
import { formatDate, formatCurrency } from "../formatters";

const ListBills = () => {

    const [bills, setBills] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const getBills = async () => {
            const { data } = await axios.get('/api/bills/getall');
            setBills(data);
            setIsLoading(false);
        };
        getBills();
    }, []);

    if(isLoading){
        return (
            <div className="container d-flex justify-content-center align-items-center" style={{marginTop: 80}}>
                <img src='/src/loadingimage/Disk@1x-1.0s-200px-200px.gif' />
            </div>
        )
    }

    return (
        <div className="container" style={{ marginTop: 80 }}>
            <div className="container mt-5">
                <h2>Bills List</h2>
                <table className="table table-striped table-hover table-bordered mt-5">
                    <thead>
                        <tr>
                            <th scope="col">Date</th>
                            <th scope="col">Total Amount</th>
                            <th scope="col">Participants</th>
                            <th scope="col">Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bills.map(b => <tr key={b.id}>
                            <td>{formatDate(b.date)}</td>
                            <td>{formatCurrency(b.totalAmount)}</td>
                            <td>{b.participantCount}</td>
                            <td>
                                <Link className="btn btn-outline-info w-100" to={`/billdetails/${b.id}`}>View Details</Link>
                            </td>
                        </tr>)}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
export default ListBills;