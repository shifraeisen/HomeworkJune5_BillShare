import { useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { formatCurrency } from "../formatters";

const AddBill = () => {

    const navigate = useNavigate();

    useEffect(() => {
        const getParticipants = async () => {
            const { data } = await axios.get('/api/participants/getall');
            setParticipants(data);
        };
        getParticipants();
    }, []);

    const [participants, setParticipants] = useState([]);
    const [amount, setAmount] = useState(0);
    const [selectedIds, setSelectedIds] = useState([]);

    const onCheckChange = id => {
        if (selectedIds.includes(id)) {
            setSelectedIds(selectedIds.filter(i => i !== id));
        }
        else {
            setSelectedIds([...selectedIds, id]);
        }
    }

    const onSubmitclick = async () => {
        await axios.post('/api/bills/add', { amount, participantIds: selectedIds });
        navigate('/listbills');
    }

    return (
        <div className="container" style={{ marginTop: 80 }}>
            <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
                <div className="card shadow p-4" style={{ width: '100vh', maxWidth: 600, backgroundColor: '#F8F9FA' }}>
                    <h2 className="card-title text-center mb-4">Add Bill</h2>
                    <div className="mb-3">
                        <label htmlFor="totalAmount" className="form-label">Total Amount</label>
                        <input type="number" className="form-control" placeholder="Bill Amount" value={amount != 0 && amount} onChange={e => setAmount(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Select Participants</label>
                        <div className="form-check">
                            {participants.map(p => <div key={p.id}>
                                <input onChange={() => onCheckChange(p.id)} className="form-check-input" type='checkbox' />
                                <label className="form-check-label">{p.name}</label>
                            </div>)}
                        </div>
                    </div>
                    {!!selectedIds.length &&
                        <div className="mt-4">
                            <h3 className="text-center">Split Amounts</h3>
                            <ul className="list-group">
                                {selectedIds.map(i => 
                                    <li key={i} className="list-group-item d-flex justify-content-between align-items-center">
                                        <span>{participants.find(p => p.id === i).name}</span>
                                        <span>{formatCurrency(amount / selectedIds.length)}</span>
                                    </li>
                                )}
                            </ul>
                        </div>}
                    <button disabled={!selectedIds.length} onClick={onSubmitclick} className="btn btn-outline-primary w-100 mt-4">Submit</button>
                </div>
            </div>
        </div>
    )
}
export default AddBill;