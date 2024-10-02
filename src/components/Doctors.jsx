import { useContext } from 'react';
import { Link } from 'react-router-dom';
import HospitalContext from '../context/hospitalContext';
import DoctorItem from './DoctorItem';

function Doctors() {
    const { doctors } = useContext(HospitalContext);

    return (
        <div className="mx-4 doc2">
            <h1 className="">Our Doctors</h1>
            <div className=" doc1">
                {doctors.length > 0 ? (
                    doctors.map((doctor) => (
                        <Link to={`/doctor/${doctor.id}`} key={doctor.id}>
                        <DoctorItem doctor={doctor} key={doctor.id} />
                        </Link>
                    ))
                ) : (
                    <p>No doctor information available.</p>
                )}
            </div>
        </div>
    );
}

export default Doctors;