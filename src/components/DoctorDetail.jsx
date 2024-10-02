
import { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import HospitalContext from "../context/hospitalContext";

function DoctorDetail() {
    const { id } = useParams();
    const { doctors } = useContext(HospitalContext);
    const doctor = doctors.find(doc => doc.id == id);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [date, setDate] = useState("");
    const [number, setNumber] = useState("");
    const [time, setTime] = useState("");
    const [message, setMessage] = useState("");
    const [confirmationMessage, setConfirmationMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        let timer;
        if (confirmationMessage) {
            timer = setTimeout(() => {
                setConfirmationMessage("");
            }, 5000);
        }
        return () => clearTimeout(timer);
    }, [confirmationMessage]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!name || !email || !number || !message || !date || !time) {
            setErrorMessage("Please fill out all fields before booking.");
            return;
        }

        const selectedDate = new Date(`${date}T${time}`);
        const selectedDay = selectedDate.toLocaleDateString('en-NG', { weekday: 'long' });
        const workingDays = doctor.workingDays.map(day => day.toLowerCase());
        const formattedSelectedDay = selectedDay.toLowerCase();

        if (!workingDays.includes(formattedSelectedDay)) {
            setErrorMessage(`Doctor is not available on ${selectedDay}.`);
            return;
        }

        const workingHours = doctor.workingHours.split(" - ");
        const startTime = new Date(`${date}T${workingHours[0]}`);
        const endTime = new Date(`${date}T${workingHours[1]}`);

        if (selectedDate < startTime || selectedDate > endTime) {
            setErrorMessage(`Doctor is not available at this time. Available hours are ${doctor.workingHours}.`);
            return;
        }

        setConfirmationMessage(`You have booked an appointment with ${doctor.name} on ${selectedDate.toLocaleDateString()} at ${time}.`);
        resetForm();
    };

    const handleCancel = () => {
        setConfirmationMessage(`You canceled your appointment with ${doctor.name}.`);
    };

    const resetForm = () => {
        setName("");
        setEmail("");
        setDate("");
        setNumber("");
        setTime("");
        setMessage("");
        setErrorMessage("");
    };

    if (!doctor) {
        return <div>No doctor found</div>;
    }

    return (
        <div className="doctorDetail">
            <img src={doctor.image} alt="" className="header" />
            <div className="doctorInfo">
                <h1>{doctor.name}</h1>
                <div className="infoRow">
                    <div className="infoItem">Specialty: {doctor.specialty}</div>
                    <div className="infoItem">Working Days: {doctor.workingDays.join(", ")}</div>
                    <div className="infoItem">Working Hours: {doctor.workingHours}</div>
                </div>
                <p>Days Off: {doctor.daysOff.join(", ")}</p>
            </div>
            <div className="appointmentForm">
                <form onSubmit={handleSubmit}>
                    <h1>Appointment</h1>
                    <label>
                        <input
                            type="text"
                            placeholder="Enter your name"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </label>
                    <label>
                        <input
                            type="email"
                            placeholder="Your email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </label>
                    <label>
                        <input
                            type="date"
                            id="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                        />
                    </label>
                    <label>
                        <input
                            type="tel"
                            placeholder="Your number"
                            id="number"
                            value={number}
                            onChange={(e) => setNumber(e.target.value)}
                        />
                    </label>
                    <label>
                        <input
                            type="time"
                            id="time"
                            value={time}
                            onChange={(e) => setTime(e.target.value)}
                        />
                    </label>
                    <textarea
                        placeholder="Your message"
                        id="message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    ></textarea>
                    <button type="submit">Book Appointment</button>
                </form>
                {errorMessage && <div className="errorMessage">{errorMessage}</div>}
                {confirmationMessage && (
                    <div className="confirmationMessage">
                        {confirmationMessage}
                        <button onClick={handleCancel}>Cancel Appointment</button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default DoctorDetail;