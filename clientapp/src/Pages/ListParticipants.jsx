import { useEffect, useState } from "react";
import axios from 'axios';

const ListParticipants = () => {

    const [participants, setParticipants] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const getParticipants = async () => {
            const { data } = await axios.get('/api/participants/getall');
            setParticipants(data);
            setIsLoading(false);
        };
        getParticipants();
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
                <h2>Participants List</h2>
                <table className="table table-striped table-hover table-bordered mt-5">
                    <thead>
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {participants.map(p => <tr key={p.id}>
                            <td>{p.name}</td>
                            <td>{p.email ?? ''}</td>
                        </tr>)}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
export default ListParticipants;