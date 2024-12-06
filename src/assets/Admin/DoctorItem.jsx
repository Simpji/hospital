import React from 'react';

function DoctorItem({ doctor }) {
    return (
        <div className="doctor-item ">
            <img src={doctor.image} alt={doctor.name}  />
            <h2>{doctor.name}</h2>
            <p>{doctor.yearsOfExperience}</p>
        </div>
    );
}

export default DoctorItem;