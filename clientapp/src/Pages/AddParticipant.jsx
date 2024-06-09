import { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const AddParticipant = () => {

    const navigate = useNavigate();

    const [participant, setParticipant] = useState({
        name: '',
        email: ''
    });

    const onTextChange = e => {
        const copy = { ...participant };
        copy[e.target.name] = e.target.value;
        setParticipant(copy);
    };

    const onAddClick = async () => {
        await axios.post('/api/participants/add', participant);
        navigate('/listparticipants');
    }

    return (
        <div className='container' style={{ marginTop: 80 }}>
            <div className='container d-flex justify-content-center align-items-center' style={{ minHeight: '80vh' }}>
                <div className="card shadow p-4" style={{ width: '100vh', maxWidth: 600, backgroundColor: '#F8F9FA' }}>
                    <h2 className="card-title text-center mb-4">Add Participant</h2>
                    <div className="mb-3">
                        <label htmlFor='participantName' className="form-label">Name</label>
                        <input name='name' type='text' className="form-control" placeholder="Name" value={participant.name} onChange={onTextChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor='participantEmail' className="form-label">Email (optional)</label>
                        <input name='email' type='email' className="form-control" placeholder="Email" value={participant.email} onChange={onTextChange} />
                    </div>
                    <button onClick={onAddClick} className="btn btn-outline-primary w-100">Add Participant</button>
                </div>
            </div>
        </div>
    )
}
export default AddParticipant;